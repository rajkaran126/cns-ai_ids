$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "C:\Users\KARAN\.gemini\antigravity-ide\brain\b0fadcd7-d369-4260-b98b-394b0d73075a\figures"
$brainDir = "C:\Users\KARAN\.gemini\antigravity-ide\brain\b0fadcd7-d369-4260-b98b-394b0d73075a"
$publicDir = "c:\Users\KARAN\cns\public\figures"

$targets = @(
    @{ Id="fig1"; Hash="fig1"; Out="figure_1_dataset_preprocessing.png"; Size="1440,1050" },
    @{ Id="fig2"; Hash="fig2"; Out="figure_2_model_training.png"; Size="1440,950" },
    @{ Id="fig3"; Hash="fig3"; Out="figure_3_model_performance.png"; Size="1440,1100" },
    @{ Id="fig4"; Hash="fig4"; Out="figure_4_normal_traffic.png"; Size="1440,950" },
    @{ Id="fig5"; Hash="fig5"; Out="figure_5_attack_detection.png"; Size="1440,1000" },
    @{ Id="fig6"; Hash="fig6"; Out="figure_6_security_dashboard.png"; Size="1440,1100" }
)

foreach ($t in $targets) {
    $tempDir = "C:\Users\KARAN\AppData\Local\Temp\chrome_snap_" + $t.Id
    $outFile = Join-Path $outDir $t.Out
    $url = "http://localhost:5173/#" + $t.Hash
    
    echo "Capturing $($t.Id) from $url -> $outFile..."
    $p = Start-Process -FilePath $chrome -ArgumentList @(
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        "--user-data-dir=$tempDir",
        "--screenshot=$outFile",
        "--window-size=$($t.Size)",
        $url
    ) -PassThru -Wait
    
    # Copy to brain root and public/figures as well
    Copy-Item -Path $outFile -Destination (Join-Path $brainDir $t.Out) -Force
    Copy-Item -Path $outFile -Destination (Join-Path $publicDir $t.Out) -Force
    echo "Done $($t.Id), size: $((Get-Item $outFile).Length) bytes"
}

echo "All 6 real DOM screenshots captured successfully!"
