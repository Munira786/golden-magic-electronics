$files = Get-ChildItem -Path "c:\Users\marry\OneDrive\Desktop\GME_VS" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # 1. Remove the span.en and span.ar, keeping only the English content.
    # Note: Using single line mode (?s) so . matches newlines if there are any inside the spans.
    $content = [regex]::Replace($content, '(?s)<span class="en">(.*?)</span><span class="ar">.*?</span>', '$1')

    # 2. Remove the langToggle button entirely
    $content = [regex]::Replace($content, '(?s)<button class="langToggle[^>]*>.*?</button>', '')

    Set-Content -Path $file.FullName -Value $content -NoNewline
}
Write-Host "Localization stripped successfully from all HTML files."
