from pathlib import Path
import shutil
import sys


CSS_TAG = '<link href="docs-custom.css" rel="stylesheet" type="text/css"/>\n'
JS_TAG = '<script type="text/javascript" src="docs-custom.js"></script>\n'
README_ORIG = "md__r_e_a_d_m_e.html"
README_ALIAS = "readme.html"


def inject_assets(html_path: Path) -> None:
    text = html_path.read_text(encoding="utf-8")
    if "docs-custom.css" not in text or "docs-custom.js" not in text:
        marker = "</head>"
        if marker not in text:
            return
        text = text.replace(marker, CSS_TAG + JS_TAG + marker, 1)
    if README_ORIG in text:
        text = text.replace(README_ORIG, README_ALIAS)
    html_path.write_text(text, encoding="utf-8")


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: postprocess_doxygen.py <html-dir>")
        return 1
    root = Path(sys.argv[1])
    for html_path in root.glob("*.html"):
        inject_assets(html_path)
    readme_src = root / README_ORIG
    readme_dst = root / README_ALIAS
    if readme_src.exists():
        shutil.copyfile(readme_src, readme_dst)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
