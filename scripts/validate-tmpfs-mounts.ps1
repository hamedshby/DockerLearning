$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $projectRoot 'index.html'
$chapterPath = Join-Path $projectRoot 'chapters\ch7-2.html'

function Assert-Contains {
    param(
        [string]$Content,
        [string]$Pattern,
        [string]$Message
    )

    if ($Content -notmatch $Pattern) {
        throw $Message
    }
}

$index = Get-Content -Raw -Encoding utf8 $indexPath
Assert-Contains $index 'data-target="ch7-2"' 'The Part 4 TOC must target ch7-2.'

if (-not (Test-Path -LiteralPath $chapterPath)) {
    throw 'Missing chapters/ch7-2.html.'
}

$chapter = Get-Content -Raw -Encoding utf8 $chapterPath
$requiredPatterns = [ordered]@{
    'tmpfs heading' = 'What is a tmpfs Mount\?'
    '--tmpfs syntax' = 'docker run[\s\S]*--tmpfs'
    '--mount syntax' = '--mount type=tmpfs'
    'size option' = 'tmpfs-size'
    'mode option' = 'tmpfs-mode'
    'Compose example' = 'tmpfs:'
    'storage comparison' = 'comparison-table'
    'security guidance' = 'Security and Best Practices'
    'lab section' = 'lab-section'
    'quiz section' = 'chapter-quiz'
}

foreach ($entry in $requiredPatterns.GetEnumerator()) {
    Assert-Contains $chapter $entry.Value "Missing required content: $($entry.Key)."
}

$quizQuestionCount = ([regex]::Matches($chapter, 'class="quiz-question"')).Count
if ($quizQuestionCount -ne 5) {
    throw "Expected 5 quiz questions; found $quizQuestionCount."
}

$faCount = ([regex]::Matches($chapter, '\sdata-fa=')).Count
$enCount = ([regex]::Matches($chapter, '\sdata-en=')).Count
if ($faCount -eq 0 -or $faCount -ne $enCount) {
    throw "Bilingual attribute mismatch: data-fa=$faCount, data-en=$enCount."
}

Write-Output "tmpfs chapter validation passed: $quizQuestionCount quiz questions, $faCount bilingual elements."
