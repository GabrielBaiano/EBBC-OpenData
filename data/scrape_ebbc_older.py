import urllib.request
import json
import re
import os
import ssl
import html
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor, as_completed

class OJSArticleParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta_data = {}
        
    def handle_starttag(self, tag, attrs):
        if tag == "meta":
            attr_dict = dict(attrs)
            name = attr_dict.get("name")
            content = attr_dict.get("content")
            if name and content is not None:
                content_unescaped = html.unescape(content).strip()
                if name not in self.meta_data:
                    self.meta_data[name] = []
                self.meta_data[name].append(content_unescaped)

def get_html(url):
    ctx = ssl._create_unverified_context()
    req = urllib.request.Request(
        url, 
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as res:
            return res.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"Erro ao acessar {url}: {e}")
        return None

# Classification patterns matching original extract_ebbc.py exactly
TOOLS_MAP = {
    "VOSviewer": r"\bvosviewer\b",
    "Gephi": r"\bgephi\b",
    "CiteSpace": r"\bcitespace\b",
    "bibliometrix": r"\bbibliometrix\b|\br-bibliometrix\b",
    "Python": r"\bpython\b",
    "R": r"\b[Rr]\b\s+(?:language|programming|script|package[s]?|studio|ggplot|environment|code|software|statistical|\bbase\b|\blibrary\b)|\b(?:uses|used|using|in)\s+[Rr]\b|\b[Rr]\s*-\s*based\b|\b[Rr]\s*\(\s*(?:version|v\d+)",
    "Excel": r"\bexcel\b|\bms\s+excel\b",
    "SPSS": r"\bspss\b",
    "Stata": r"\bstata\b",
    "SAS": r"\bsas\b",
    "Pajek": r"\bpajek\b",
    "Sci2": r"\bsci2\b|\bscience\s+of\s+science\s+tool\b",
    "BibExcel": r"\bbibexcel\b",
    "SQL": r"\bsql\b|\bmysql\b|\bpostgresql\b|\bsqlite\b",
    "Tableau": r"\btableau\b",
    "Power BI": r"\bpower\s*bi\b",
    "ChatGPT": r"\bchatgpt\b|\bgpt-4\b|\bgpt-3\.5\b|\bllm\b|\bgenai\b|\bgenerative\s+ai\b",
}

SOURCES_MAP = {
    "Web of Science": r"\bweb\s+of\s+science\b|\bwos\b",
    "Scopus": r"\bscopus\b",
    "OpenAlex": r"\bopenalex\b",
    "Dimensions": r"\bdimensions\b",
    "Crossref": r"\bcrossref\b",
    "PubMed": r"\bpubmed\b|\bmedline\b",
    "PubMed Central": r"\bpmc\b|\bpubmed\s+central\b",
    "Google Scholar": r"\bgoogle\s+scholar\b",
    "ORCID": r"\borcid\b",
    "DBLP": r"\bdblp\b",
    "arXiv": r"\barxiv\b",
    "bioRxiv": r"\bbiorxiv\b",
    "GitHub": r"\bgithub\b",
    "Zenodo": r"\bzenodo\b",
    "The Lens": r"\bthe\s+lens\b|\blens\.org\b",
    "Microsoft Academic Graph": r"\bmicrosoft\s+academic\s+graph\b|\bmag\b",
}

def process_article(link):
    art_html = get_html(link)
    if not art_html:
        return None
        
    parser = OJSArticleParser()
    parser.feed(art_html)
    meta = parser.meta_data
    
    # Title
    title_list = meta.get("citation_title") or meta.get("DC.Title") or ["N/A"]
    title = title_list[0]
    
    # Authors
    authors_list = meta.get("citation_author") or meta.get("DC.Creator.PersonalName") or []
    authors = ", ".join(authors_list) if authors_list else "N/A"
    
    # DOI
    doi_list = meta.get("citation_doi") or meta.get("DC.Identifier.DOI") or []
    doi = doi_list[0] if doi_list else "N/A"
    if doi != "N/A" and not doi.startswith("http"):
        doi = f"https://doi.org/{doi}"
        
    # Keywords
    keywords_list = meta.get("citation_keywords") or meta.get("DC.Subject") or []
    keywords = ", ".join(keywords_list) if keywords_list else ""
    
    # Abstract (Description)
    abstract_list = meta.get("DC.Description") or meta.get("description") or [""]
    abstract = abstract_list[0]
    
    # Automatic Classification
    full_search_text = f"{title} {abstract} {keywords}"
    text_lower = full_search_text.lower()
    
    extracted_tools = []
    for tool_name, pattern in TOOLS_MAP.items():
        if re.search(pattern, text_lower):
            extracted_tools.append(tool_name)
            
    extracted_sources = []
    for source_name, pattern in SOURCES_MAP.items():
        if re.search(pattern, text_lower):
            extracted_sources.append(source_name)
            
    if extracted_tools:
        ferramenta = ", ".join(extracted_tools)
        identifica = "Sim"
    else:
        ferramenta = "N/A"
        identifica = "N/A"
        
    onde_usou = []
    for tool in extracted_tools:
        if tool in ["VOSviewer", "Gephi", "CiteSpace", "Pajek", "Tableau", "Power BI"]:
            onde_usou.append("visualização - gerar gráficos")
            onde_usou.append("análise dos dados")
        elif tool in ["Python", "R", "SQL", "Excel", "SPSS", "Stata", "SAS", "Sci2", "BibExcel"]:
            onde_usou.append("análise dos dados")
            onde_usou.append("coleta dos dados")
        elif tool in ["ChatGPT"]:
            onde_usou.append("análise dos dados")
            
    onde_usou_str = ", ".join(sorted(list(set(onde_usou)))) if onde_usou else "N/A"
    fonte_dados = ", ".join(extracted_sources) if extracted_sources else "N/A"
    
    return {
        "DOI": doi,
        "Título": title,
        "Autoria": authors,
        "Palavras-chave": keywords,
        "Ferramenta utilizada": ferramenta,
        "Identifica a ferramenta?": identifica,
        "Onde usou (coleta dos dados, análise dos dados ou visualização - gerar gráficos)": onde_usou_str,
        "Fonte de coleta de dados (da onde o pesquisador tirou a informação?)": fonte_dados,
        "abstract": abstract
    }

def scrape_year(year, issue_url):
    print(f"\n[Scraper] Iniciando raspagem de {year} ({issue_url})...")
    issue_html = get_html(issue_url)
    if not issue_html:
        return
        
    links = re.findall(r'href="(https://ebbc\.inf.br/ojs/index\.php/ebbc/article/view/\d+)"', issue_html)
    unique_links = sorted(list(set(links)))
    total = len(unique_links)
    print(f"[Scraper] Edição {year}: {total} artigos encontrados.")
    
    articles_data = []
    abstracts_cache = {}
    
    # Process concurrently using thread pool
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(process_article, link): link for link in unique_links}
        for future in as_completed(futures):
            res = future.result()
            if res:
                # Add to cache mapping
                doi = res["DOI"]
                title = res["Título"]
                abstract = res.pop("abstract", "") # Remove abstract from articles data structure
                
                # Cache by DOI or Title
                if doi and doi != "N/A":
                    abstracts_cache[doi] = abstract
                else:
                    # Normalize title for caching
                    import unicodedata
                    normalized_title = unicodedata.normalize('NFD', title.lower()).encode('ascii', 'ignore').decode('utf-8')
                    norm_title = re.sub(r'[^a-z0-9]', '', normalized_title)
                    abstracts_cache[norm_title] = abstract
                    
                articles_data.append(res)
                print(f"[Scraper] {year}: {len(articles_data)}/{total} artigos processados.")

    # Save ebbc_YEAR_data.json
    out_data = f"data/ebbc_{year}_data.json"
    with open(out_data, "w", encoding="utf-8") as f:
        json.dump(articles_data, f, ensure_ascii=False, indent=2)
        
    # Save ebbc_YEAR_abstracts_cache.json
    out_cache = f"data/ebbc_{year}_abstracts_cache.json"
    with open(out_cache, "w", encoding="utf-8") as f:
        json.dump(abstracts_cache, f, ensure_ascii=False, indent=2)
        
    print(f"[Scraper] Edição {year} concluída com sucesso! Dados e abstracts salvos.")

def main():
    editions = {
        2012: "https://ebbc.inf.br/ojs/index.php/ebbc/issue/view/8",
        2014: "https://ebbc.inf.br/ojs/index.php/ebbc/issue/view/9",
        2016: "https://ebbc.inf.br/ojs/index.php/ebbc/issue/view/10",
        2018: "https://ebbc.inf.br/ojs/index.php/ebbc/issue/view/11"
    }
    
    for year, url in editions.items():
        scrape_year(year, url)

if __name__ == "__main__":
    main()
