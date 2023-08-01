# Types for MegaEdit

Type definitions for the MegaEdit scripting interface

## Scripting Principles

When creating instances within the script for a field or a UI component, those elements are decoupled from the editor instances.
Updates from the script to the editor are applied via separate methods - and updates from the editor to the script are done via a reload mechnism.
For UI components, when callbacks are configured, the component will auto-reload in case of events.

## <a name="supportedfiletypes"></a> Supported File types

### Media items

- PDF: Keeps the PDF structure intact when possible and reuses the PDF as an XObject within the output (including vector information, spot colors etc).
- JPEG: Supports CMYK and RGB images.
- PNG: the transparency will be preserved 
- GIF: the transparency will be preserved
- BMP
- TIFF: supports CMYK and RGB images

### Fonts

The editor uses optionally different fonts for printing and web display. It is important that the fonts match in their glyph setup to generate consistent output.
A True Type font is **always required** as that is used for output. For the web display, the following formats are supported:

- True Type Fonts (TTF)
- Open Type Font (OTF)
- Embedded OpenType Font (EOT)
- Web Open Font Format (WOFF)
- SVG Fonts

In addition, there are the following built in fonts (which all have bold, italic and bold-italic variants).
- Courier
- Helvetica
- Times
Note that you have to enable the built in fonts via resources too.

## <a name="richtextformat"></a> Mega Edit Rich Text Format

Richtext closely resembles HTML by using a similar tag format (which can be configured to a different format if required). It is not HTML though and has only a limited feature set.
The only tags supported are
- span tag to set styles
- br tag to indicate a new line
- In addition, HTML entities like `&gt;` or `&lt;` are also supported.

Example:
```
<span style="font-size: 18">This is a header</span><br /><br />And a <span style="color: #FF0000; text-decoration: underline">red and underlined</span> bit of text.
```

The following styles can be used.

### Color

This will set the font color. The color format as described in (#colors) can be used with two exceptions:
- no alpha channel is supported and the alhpa value will be ignored.
- CMYK is using dashes instead of colon to separate: `c-m-y-k`

**Property name**: color

### Font Family

The font is specified via the font name defined in the font resource. The fonts must be available for the current document.

**Property name**: font-family

### Font Weight

If the current font supports it (that can be the font defined in a rich text style element or the default font of the field), the font weight can be configured via this setting:
- normal: the normal variant is used
- bold: the bold variant is used

**Property name**: font-weight

Note: when in addition to the weight also the style is configured, there must be a valid variant with bold and italic glyphs configured.

### Font Style

If the current font supports it (that can be the font defined in a rich text style element or the default font of the field), the font style can be configured via this setting:
- normal: the normal variant is used
- italic: the italic variant is used

**Property name**: font-style

Note: when in addition to the weight also the style is configured, there must be a valid variant with bold and italic glyphs configured.

### Font Size

Set the font size in points - only supported as numbers without a unit

**Property name** font-size

### Text Decoration

Supporting the following text decoration styles:
- none: the default rendering
- underline: the text is underlined
- line-through: the text is stroked out

**Property name** text-decoration

## <a name="colors"></a> Mega Edit Color Format

Colors are stored and configured in a textual representation.
You can use the [Color Helper](./variables/Helper___Color_Helper.ColorHelper-1.html) to perform conversion to the individual components for additional manipulation.

But it is easy to work with the string format directly.

Not all elements can accept all color spaces, some have to be in RGB. Limitations are mentioned on the respective properties.

### RGB Format

The RGB color space has 3 components for the red, green and blue channels.

- Hex format: `#FFAA00` with the hex values for the red, green and blue component in order with 6 or 3 digits. See https://www.w3schools.com/css/css_colors_hex.asp
- rgba format: `rgba(red, green, blue, alpha)` with the decimal values the red, green and blue component in the range of [0,255] and the alpha value in the range of [0, 1.0]. Note that alpha is ignored except when used in the [CustomFieldCanvas](variables/Field___Custom_Field.CustomFieldCanvas-1.html) context.

### CMYK Format

The CMYK color space has 4 components for the cyan, magenta, yellow and black channel separated by colons.
The format is `cyan:magenta:yellow:black` where each number is an integer representing the percentage of that channel in the range of [0, 100].
Example would be `0:100:0:0` for a pure magenta color.

### Spot Colors

Spot colors have to be defined in admin and linked to the product to be usable. They are defined by the name of the separation color space and a tint value.

- Name: must be a valid color name defined in the spot color resource
- Tint: must be a floating point value in the range [0, 1.0] specifying the tint of the spot color

Example would be `separation("Pantone Green", 1.0)`
