$ErrorActionPreference = 'Stop'

if (-not (Test-Path Env:OPENAI_API_KEY)) {
  throw 'OPENAI_API_KEY is not set.'
}

$pythonCandidates = @(
  'python',
  'py',
  'C:\Users\David\AppData\Local\Programs\Python\Python313\python.exe',
  'C:\Users\David\AppData\Local\Programs\Python\Python312\python.exe',
  'C:\Users\David\AppData\Local\Programs\Python\Python311\python.exe',
  'C:\Python313\python.exe',
  'C:\Python312\python.exe',
  'C:\Python311\python.exe'
)

$pythonCmd = $null
foreach ($candidate in $pythonCandidates) {
  try {
    if ($candidate -in @('python', 'py')) {
      $null = Get-Command $candidate -ErrorAction Stop
      $pythonCmd = $candidate
      break
    }
    if (Test-Path $candidate) {
      $pythonCmd = $candidate
      break
    }
  } catch {
  }
}

if (-not $pythonCmd) {
  throw 'Python was not found. Install Python or add it to PATH.'
}

& $pythonCmd 'C:\Users\David\.codex\skills\sora\scripts\sora.py' create-and-poll `
  --prompt-file 'tmp\sora\contenx-hero-v1.txt' `
  --no-augment `
  --model 'sora-2-pro' `
  --size '1280x720' `
  --seconds '4' `
  --download `
  --variant 'video' `
  --out 'out\sora\contenx-hero-v1.mp4' `
  --json-out 'out\sora\contenx-hero-v1-job.json'
