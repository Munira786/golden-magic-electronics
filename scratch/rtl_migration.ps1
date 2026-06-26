$files = Get-ChildItem -Path "c:\Users\marry\OneDrive\Desktop\GME_VS" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Negative prefixes too (e.g. -ml-4 -> -ms-4)
    $content = [regex]::Replace($content, '(?<=\s|^|"|'')(-?)(ml-)', '${1}ms-')
    $content = [regex]::Replace($content, '(?<=\s|^|"|'')(-?)(mr-)', '${1}me-')
    $content = [regex]::Replace($content, '(?<=\s|^|"|'')(-?)(pl-)', '${1}ps-')
    $content = [regex]::Replace($content, '(?<=\s|^|"|'')(-?)(pr-)', '${1}pe-')
    
    $content = [regex]::Replace($content, '\btext-left\b', 'text-start')
    $content = [regex]::Replace($content, '\btext-right\b', 'text-end')
    
    $content = [regex]::Replace($content, '(?<=\s|^|"|'')(-?)(left-)', '${1}start-')
    $content = [regex]::Replace($content, '(?<=\s|^|"|'')(-?)(right-)', '${1}end-')
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "Migration complete!"
