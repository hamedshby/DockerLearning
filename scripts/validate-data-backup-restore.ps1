$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $projectRoot 'index.html'
$chapterPath = Join-Path $projectRoot 'chapters\ch7-3.html'

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
Assert-Contains $index 'data-target="ch7-3"' 'The Part 4 TOC must target ch7-3.'

if (-not (Test-Path -LiteralPath $chapterPath)) {
    throw 'Missing chapters/ch7-3.html.'
}

$chapter = Get-Content -Raw -Encoding utf8 $chapterPath
$requiredPatterns = [ordered]@{
    'chapter heading' = 'What Is Backup and Restore\?'
    'consistent backup guidance' = 'Consistent Backups'
    'temporary backup Container' = 'alpine[\s\S]*tar'
    'read-only source mount' = '(readonly|:ro)'
    'named Volume restore' = 'Restoring a Named Volume'
    'Bind Mount guidance' = 'Backing Up a Bind Mount'
    'SQL Server logical backup' = 'BACKUP DATABASE'
    'integrity verification' = '(checksum|SHA256|RESTORE VERIFYONLY)'
    'retention guidance' = 'Retention'
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

foreach ($tag in @('h1', 'h3', 'p', 'ul', 'li', 'table', 'section', 'div', 'pre', 'code')) {
    $openCount = ([regex]::Matches($chapter, "<$tag(?:\s|>)")).Count
    $closeCount = ([regex]::Matches($chapter, "</$tag>")).Count
    if ($openCount -ne $closeCount) {
        throw "Unbalanced <$tag> tags: open=$openCount, close=$closeCount."
    }
}

Write-Output "Data Backup and Restore chapter validation passed: $quizQuestionCount quiz questions, $faCount bilingual elements."

