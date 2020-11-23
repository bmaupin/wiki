---
title: LibreOffice
---

#### Assign keyboard shortcut to paste unformatted text

1. _Tools_ > _Options_ > _LibreOffice_ > _Advanced_ > check _Enable macro recording_ > _OK_

1. Copy some text from somewhere else (e.g. your browser)

1. _Edit_ > make sure _Paste Special_ isn't greyed out. If it is, try copying something else, or try clicking elsewhere in the LibreOffice document.

1. _Tools_ > _Macros_ > _Record Macro_

1. _Edit_ > _Paste Special_ > _Unformatted text_ > _OK_

1. _Stop Recording_ > _Macro name_: PasteUnformattedText > _Save_

1. _Tools_ > _Customize_ > _Keyboard_

1. Near the top right select _LibreOffice_

1. In _Shortcut keys_ scroll down to Ctrl+Shift+V

1. In _Category_ scroll down to _LibreOffice Macros_ > _user_ > _Standard_ > _Module1_

1. In _Function_ select _PasteUnformattedText_ > _Modify_ > _OK_

#### Convert old documents from the command line

- WDB (Microsoft Works database)
  ```
  soffice --headless --convert-to ods file.wdb
  ```
- WKS (Microsoft Works spreadsheet)

  ```
  soffice --headless --convert-to ods file.wks
  ```

- WPS (Microsoft Works document)

  ```
  soffice --headless --convert-to odt file.wps
  ```

- WRI (Microsoft Write document)
  ```
  soffice --headless --convert-to odt file.wri
  ```
