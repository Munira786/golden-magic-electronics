$files = Get-ChildItem -Path "c:\Users\marry\OneDrive\Desktop\GME_VS" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Use word boundary and optional minus sign for the prefix
    $content = [regex]::Replace($content, '\b(-?)ml-', '${1}ms-')
    $content = [regex]::Replace($content, '\b(-?)mr-', '${1}me-')
    $content = [regex]::Replace($content, '\b(-?)pl-', '${1}ps-')
    $content = [regex]::Replace($content, '\b(-?)pr-', '${1}pe-')
    $content = [regex]::Replace($content, '\b(-?)left-', '${1}start-')
    $content = [regex]::Replace($content, '\b(-?)right-', '${1}end-')
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
}
Write-Host "Migration round 2 complete!"
