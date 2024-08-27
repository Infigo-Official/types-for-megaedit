# Mega Edit Scripting Interface

Documentation for the entire Mega Edit scripting engine.
Type declarations can be found in the [NPM package](https://www.npmjs.com/package/@infigo-official/types-for-megaedit) and be used for your TypeScript and Javascript projects to get full intellisense support.

## Mega Edit Components

### Canvas

The canvas is the main component of the editor. It is the area where the user can interact with the document and where the document is rendered.
Multiple canvases can be configured for a product and the user can switch between them. 

The canvas itself defines the aspect ratio. In addition, a canvas will also have one or more sizes available which essentially scale the canvas to the given final size.
Switching between different sizes will result in the same layout, as the aspect ratio is the same.
Switching between different canvases will readjust the layout to the new aspect ratio.

MegaEdit will have a dynamic layout configuration, which will adjust the fields to the new aspect ratio by maintaining a percentage based positioning and sizing.
Additionally, smart layout can be used which utilizes layouts (matched by name) for the new canvas. This gives full control over the transition process.

Depending on the output type, the canvas will be used as a single page, or two canvases (left and right) for spreads.

Finally, there is another option to use dynamic canvas sizes, which allows to adjust the size within a given range. This can be either applied to all pages or every page individually.

### Stock

The next component defines the stock or material. This is used for price calculations, but also weight and optional appearance in the editor.

The product can have multiple stocks configured and the user can switch between them.

### Output Types

The final component is the output type. This defines the final output format like spreads or single pages, covers, bleed, gutter etc.

The user can also switch between different output types, but it is important to have compatible setups for the default product.

The following configurations are supported:
- Single pages
- Spread setups without cover
- Spread setups with cover, but no editable cover inside pages
- Spread setups with cover and editable cover inside pages

## Resources

Resources are grouped within categories. The categories are then assigned to indivdiual products to make them available.
Some of the categories can be defined as admin only, which means that they are not available for the user to configure - but any applied resource will still be used.

### Fonts

Fonts can be defined by uploading them in a category in admin using a naming pattern. If format options like bold and italic should be supported, the variant files need to be provided.
MegaEdit will not adjust the glyphs directly. When uploading the variants, a naming pattern as outlined in the administration interface helps to identify the correct files.

The fonts can then be used within the UI, for the administrator and to select by the user.

### Backgrounds

Backgrounds can be defined in categories and are either images or colors. Backgrounds can be applied to the page - and for spread setups to the left and right page individually.

### Cliparts

Cliparts act as media items provided by the template setup and are uploaded into categories. They can be added to the pages for static content.

### Masks

Masks are grayscale images available for image fields and can mask the image based on the color value - fully visible for black and fully transparent for white and everything in between.
Note that masks will raster the image used, which means vector features (PDF) or CMYK color space will be lost.

### Layouts

Layouts store a field configuration and background in a reusable package. Layouts can be for single pages or if available entire spreads.
They are also stored in categories, but will be saved directly within the editor by the administrator.

There is also a feature for the end user to create and reuse custom layouts.

### Spot Colors

In order to use spot colors aka the separation color space, the colors need to be defined in admin within categories and assigned to the product.
Then if enabled, those colors can be used in the editor for text and vector elements.

### Placeholders

This allows the admin to provide a single category with placeholder images within it. Placeholder images are displayed in empty image fields to provide a visual representation of the potential result even when empty.

## Fields

The editor supports the following field types:
- Text fields to display text - optionally in rich text format
- Image fields to display user media or cliparts
- Path fields to render vector graphics
- Custom fields to render custom content

Custom fields can be defined and have appearance, behaviour and UI defined by the script which registers the type.

A custom drawing canvas can be created which works with standard Javascript 2D drawing commands to generate the appearance, which will be transfered to the PDF in vector form where possible.
Most features are supported, but there are some limitations.

## Scripting Principles

### Object in scripting context

When creating instances within the script for a field or a UI component, those elements are decoupled from the editor instances.
Updates from the script to the editor are applied via separate methods - and updates from the editor to the script are done via a reload mechnism.
For UI components, when callbacks are configured, the component will auto-reload in case of events.

### Events

The editor will fire events for various actions. Those events can be used to trigger actions in the script and react - e.g. when the page is changed or content is modified.

In addition, the scripts can interact with each other using a broadcast and listen mechanism. This allows to savely communicate between different scripts and syncronize their actions.

### Data

Data can be stored and retrieved in various ways and used by the scripts to store state and retrieve information:
- stored against the job
- stored against the product
- stored against the user
- stored against the department
- stored against the storefront (aka general data)

In addition, the script has access to the custom data configuration, which uses high performance storage to search through very large amount of data quickly.
And files uploaded to the general data can be accessed by the script as will if the right permissions are available.

Finally, the script can retrieve information about products, users and departments.

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

## UI

### Editor UI

The script can control what parts of the editor should be shown.
It can control the current view port and work with the field selection.

### Custom UI

There are over 30 UI components available to generate custom UI.
Those components can be added to various areas in the editor, used in a popup dialog or within tabs and field popup windows.
Custom fields will use those to define the custom user interface.

The components are grouped into the following categories:
- standard controls like text boxes, buttons, checkboxes, dropdowns etc.
- layout components like tabs, tables, stack layout etc
- and Bulma component to use the power of Arone for a nice looking and responsive UI
- special controls are there to work with fields, media items, inject HTML and more