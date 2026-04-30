import PyPDF2

try:
    reader = PyPDF2.PdfReader('public/resume.pdf')
    with open('resume_text.txt', 'w', encoding='utf-8') as f:
        for page in reader.pages:
            f.write(page.extract_text() + "\n\n")
    print("Done")
except Exception as e:
    print(f"Error: {e}")
