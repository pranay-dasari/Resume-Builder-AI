# ATS Score Calculator Feature

## Overview

The ATS Score Calculator is a new standalone feature that allows users to upload their existing resume and paste a job description to receive an ATS (Applicant Tracking System) score. This feature reuses the existing ATS scoring logic from the resume builder while providing an independent tool for job seekers.

## Features

### 1. Resume Upload
- Supports PDF and DOCX file formats
- Client-side file parsing (no server storage)
- File size limit: 2MB
- Automatic text extraction from uploaded files

### 2. Job Description Input
- Multiline textarea for pasting job descriptions
- Real-time preview of input
- Automatic skill extraction from job description

### 3. ATS Score Calculation
- Overall ATS score (0-100%)
- Score breakdown:
  - Hard Constraints (40%): Experience and education requirements
  - Skill Match (35%): Matching skills between resume and job description
  - Semantic Match (25%): Contextual keyword matching
- Matched skills display
- Missing skills categorization (critical vs. bonus)
- Experience flag warnings

### 4. Results Display
- Visual score representation with color coding
- Detailed breakdown with progress bars
- Matched skills with badges
- Missing skills categorization
- Actionable suggestions for improvement

## Architecture

### File Structure

```
Resume-Builder-AI/
├── components/
│   └── ats/
│       ├── ATSCalculator.tsx       # Main calculator component
│       ├── ATSScore.tsx            # Score display component (reused)
│       ├── ATSMetrics.tsx          # Metrics display (existing)
│       └── ...
├── utils/
│   ├── resumeParser.ts            # Resume file parsing utilities
│   └── ats/
│       └── canonicalMap.ts        # Skill mapping (existing)
├── services/
│   └── atsService.ts              # ATS scoring logic (reused)
└── App.tsx                         # Updated routing
```

### Key Components

#### ATSCalculator.tsx
Main component that handles:
- File upload and parsing
- Job description input
- ATS score calculation
- Results display and formatting

#### resumeParser.ts
Utility functions for:
- PDF parsing using `pdfjs-dist`
- DOCX parsing using `mammoth`
- Text normalization
- Skill extraction from text

#### atsService.ts (Reused)
Existing service that provides:
- `calculateATSScore()` function
- Skill mapping and canonicalization
- Experience calculation
- Gap analysis

## Usage Flow

1. **Landing Page**: User clicks "ATS Score Calculator" button
2. **Upload Resume**: User uploads PDF or DOCX file
3. **Paste Job Description**: User pastes job description text
4. **Calculate**: User clicks "Calculate ATS Score" button
5. **View Results**: System displays:
   - Overall ATS score
   - Score breakdown
   - Matched skills
   - Missing skills
   - Improvement suggestions

## Technical Details

### Dependencies Added

```json
{
  "pdfjs-dist": "^4.0.0",
  "mammoth": "^1.8.0"
}
```

### Resume Parsing

**PDF Parsing**:
- Uses `pdfjs-dist` library
- Extracts text from all pages
- Handles multi-page documents
- Worker setup via CDN

**DOCX Parsing**:
- Uses `mammoth` library
- Extracts raw text content
- Preserves document structure

### Skill Extraction

The system extracts skills from both resume and job description using:
1. **Exact matching**: Direct keyword lookup in standard skills list
2. **Alias matching**: Using canonical skill mappings
3. **Fuzzy matching**: Fuse.js for similar skill names
4. **Fallback**: Keeps original skill if no match found

### ATS Scoring Formula

```
Total Score = (0.4 × Hard Constraints) + (0.35 × Skill Match) + (0.25 × Semantic Match)

Hard Constraints (40%):
- Experience requirement validation
- Education requirement check

Skill Match (35%):
- Critical skills: 80% weight
- Bonus skills: 20% weight
- Penalty if < 50% critical skills matched

Semantic Match (25%):
- Bag-of-words comparison
- Keyword frequency analysis
```

## Routing

### New Route
- **Path**: `/ats-score`
- **Component**: `ATSCalculator`
- **Navigation**: From landing page via "ATS Score Calculator" button

### Route Handling
- Browser history management
- Back button support
- URL-based navigation

## UI/UX Design

### Theme Consistency
- Matches existing resume builder theme
- Dark mode support
- Tailwind CSS styling
- Responsive design (mobile, tablet, desktop)

### Color Coding
- **Green**: Matched skills, successful uploads
- **Red**: Missing critical skills, errors
- **Amber**: Bonus skills, warnings
- **Blue**: Information, suggestions

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Error messages with icons

## Error Handling

### File Upload Errors
- Unsupported file format
- File size exceeds 2MB
- Corrupted PDF/DOCX files
- Missing file content

### Calculation Errors
- Missing resume text
- Missing job description
- Invalid input data
- Processing failures

### User Feedback
- Clear error messages
- Helpful suggestions
- Graceful degradation

## Performance Considerations

### Client-Side Processing
- All file parsing happens in browser
- No server-side file storage
- Reduced latency
- Privacy-friendly (files not uploaded)

### Optimization
- Lazy loading of PDF.js worker
- Dynamic imports for large libraries
- Efficient text normalization
- Optimized skill matching

### Limits
- Maximum file size: 2MB
- Maximum job description length: No hard limit
- Processing time: < 5 seconds for typical files

## Security

### File Handling
- Client-side only processing
- No file persistence
- No external API calls
- No data transmission

### Input Validation
- File type checking
- File size validation
- Text sanitization
- Error boundary protection

## Testing

### Manual Testing Checklist
- [ ] Upload PDF resume
- [ ] Upload DOCX resume
- [ ] Paste job description
- [ ] Calculate ATS score
- [ ] Verify score breakdown
- [ ] Check matched skills display
- [ ] Check missing skills display
- [ ] Test error scenarios
- [ ] Test dark mode
- [ ] Test responsive design
- [ ] Test back navigation

### Edge Cases
- Empty resume file
- Corrupted PDF/DOCX
- Very large files (> 2MB)
- Job description with no skills
- Resume with no skills
- Special characters in text

## Future Enhancements

### Potential Features
1. **Resume Optimization Suggestions**
   - Specific keyword recommendations
   - Section reordering suggestions
   - Content improvement tips

2. **Multiple Job Comparison**
   - Compare resume against multiple job descriptions
   - Identify common skills across roles
   - Skill gap analysis

3. **Resume Improvement Tool**
   - AI-powered suggestions
   - Keyword optimization
   - Format recommendations

4. **Export Results**
   - PDF report generation
   - JSON export
   - Shareable results link

5. **Historical Tracking**
   - Save calculation history
   - Track score improvements
   - Compare multiple resumes

## Deployment

### Vercel Deployment
- No additional environment variables required
- Works within Vercel serverless limits
- Client-side processing reduces server load
- No database requirements

### Build Process
```bash
npm install
npm run build
```

### Verification
```bash
npm run build
# Verify no errors
# Test locally: npm run dev
# Deploy to Vercel
```

## Maintenance

### Skill Database Updates
- Update `standardSkills` array in `canonicalMap.ts`
- Update `canonicalMap` object for new aliases
- Test skill extraction with new skills

### Library Updates
- Monitor `pdfjs-dist` updates
- Monitor `mammoth` updates
- Test compatibility after updates

### Performance Monitoring
- Track calculation times
- Monitor error rates
- Analyze user patterns

## Support & Documentation

### User Documentation
- In-app help text
- Tooltips for key features
- Error message explanations
- Improvement suggestions

### Developer Documentation
- Code comments
- Function documentation
- Type definitions
- Architecture overview (this file)

## Compliance

### Data Privacy
- No data storage
- No tracking
- No external API calls
- GDPR compliant

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## Troubleshooting

### Common Issues

**Issue**: "Failed to parse PDF"
- **Solution**: Ensure file is a valid PDF, try re-exporting from source

**Issue**: "File size exceeds 2MB"
- **Solution**: Compress PDF or convert to text format

**Issue**: "No skills detected"
- **Solution**: Ensure resume contains standard skill keywords

**Issue**: "Low ATS score"
- **Solution**: Follow suggestions to add missing keywords and skills

## References

- [ATS Scoring Logic](./ats/ATS-Flowchart-spec.md)
- [Resume Builder Documentation](./project_overview.md)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [Mammoth Documentation](https://github.com/mwilson/mammoth.js)
