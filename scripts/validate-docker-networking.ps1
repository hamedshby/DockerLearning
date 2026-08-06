$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $projectRoot 'index.html'
$chapterPath = Join-Path $projectRoot 'chapters\ch6.html'

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
Assert-Contains $index 'data-target="ch6"' 'The Part 5 TOC must target ch6.'

if (-not (Test-Path -LiteralPath $chapterPath)) {
    throw 'Missing chapters/ch6.html.'
}

$chapter = Get-Content -Raw -Encoding utf8 $chapterPath
$requiredPatterns = [ordered]@{
    'chapter heading' = 'What Is Docker Networking\?'
    'bridge driver' = 'bridge'
    'host driver' = 'host'
    'none driver' = 'none'
    'overlay driver' = 'overlay'
    'macvlan driver' = 'macvlan'
    'ipvlan driver' = 'ipvlan'
    'network creation' = 'docker network create'
    'network inspection' = 'docker network inspect'
    'network connection' = 'docker network connect'
    'network disconnection' = 'docker network disconnect'
    'embedded DNS' = 'Embedded DNS'
    'port publishing' = '-p 8080:80'
    'security guidance' = 'Network Security'
    'troubleshooting guidance' = 'Troubleshooting Docker Networks'
    'comparison table' = 'comparison-table'
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

$singleLanguageTags = [regex]::Matches($chapter, '<[^>]+(?:data-fa|data-en)=[^>]*>') |
    Where-Object { $_.Value -notmatch 'data-fa=' -or $_.Value -notmatch 'data-en=' }
if ($singleLanguageTags.Count -ne 0) {
    throw "Found $($singleLanguageTags.Count) elements with an unpaired language attribute."
}

foreach ($tag in @('h1', 'h3', 'p', 'ul', 'ol', 'li', 'table', 'section', 'div', 'pre', 'code')) {
    $openCount = ([regex]::Matches($chapter, "<$tag(?:\s|>)")).Count
    $closeCount = ([regex]::Matches($chapter, "</$tag>")).Count
    if ($openCount -ne $closeCount) {
        throw "Unbalanced <$tag> tags: open=$openCount, close=$closeCount."
    }
}

Write-Output "Docker Networking chapter validation passed: $quizQuestionCount quiz questions, $faCount bilingual elements."

