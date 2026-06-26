$files = Get-ChildItem -Path "c:\Users\marry\OneDrive\Desktop\GME_VS" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # 1. Add overflow-x-hidden to body if not present
    if ($content -notmatch 'overflow-x-hidden') {
        $content = $content -replace '<body class="([^"]*)"', '<body class="$1 overflow-x-hidden"'
    }
    
    # 2. Add loading="lazy" to all img tags except the logo (header logo shouldn't be lazy loaded)
    $content = [regex]::Replace($content, '<img(?![^>]*loading="lazy")(?![^>]*logo\.png)[^>]*>', {
        param($match)
        $tag = $match.Value
        return $tag -replace '>$', ' loading="lazy">'
    })
    
    # 3. Add defer to main.js script tag
    $content = $content -replace '<script src="(\.\./)?js/main\.js"></script>', '<script src="$1js/main.js" defer></script>'
    
    # 4. Add missing meta descriptions
    if ($content -notmatch '<meta name="description"') {
        $titleMatch = [regex]::Match($content, '<title>(.*?)</title>')
        if ($titleMatch.Success) {
            $title = $titleMatch.Groups[1].Value
            $meta = "`r`n  <meta name=`"description`" content=`"$title - Enterprise technology solutions in the UAE.`">"
            $content = $content -replace '</title>', "</title>$meta"
        }
    }

    Set-Content -Path $file.FullName -Value $content -NoNewline
}
Write-Host "Global HTML optimizations complete!"
