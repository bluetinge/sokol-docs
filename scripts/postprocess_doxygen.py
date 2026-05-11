from pathlib import Path
import sys


CSS_TAG = '<link href="docs-custom.css" rel="stylesheet" type="text/css"/>\n'
JS_TAG = '<script type="text/javascript" src="docs-custom.js"></script>\n'


def inject_assets(html_path: Path) -> None:
    text = html_path.read_text(encoding="utf-8")
    if "docs-custom.css" in text and "docs-custom.js" in text:
        return
    marker = "</head>"
    if marker not in text:
        return
    text = text.replace(marker, CSS_TAG + JS_TAG + marker, 1)
    html_path.write_text(text, encoding="utf-8")


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: postprocess_doxygen.py <html-dir>")
        return 1
    root = Path(sys.argv[1])
    for html_path in root.glob("*.html"):
        inject_assets(html_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
