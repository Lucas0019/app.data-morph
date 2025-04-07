# CSV to JSON Converter 🧾➡️📦

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

Service application that converts a CSV data structure to JSON format, making it easier to register information in the Master Data (MD) under a specific field.

## Step 1

To use the app, you just need to have the file with the CSV table of the table you want to import, and the JSON file that will be generated.

The CSV file should be the same as the print below

![image](https://codeby.vteximg.com.br/arquivos/file-example-table-csv.png)

**Example CSV file:**

The file template is located inside src/example

```csv
  gender,locale,sizes
  uomo / man,eu,39 / 40 / 40.5 / 39 / 40 / 40.5 / 39 / 40 / 40.5 / 39 / 40 / 40.5
  uomo / man,cm,24.1 / 24.5 / 25 / 24.1 / 24.5 / 25 / 24.1 / 24.5 / 25 / 24.1 / 24.5 / 25
  uomo / man,uk,6 / 6.5 / 7 / 6 / 6.5 / 7 / 6 / 6.5 / 7 / 6 / 6.5 / 7
  uomo / man,us,6.5 / 7 / 7.5 / 6.5 / 7 / 7.5 / 6.5 / 7 / 7.5 / 6.5 / 7 / 7.5
  uomo / man,it,6.5 / 7 / 7.5 / 6.5 / 7 / 7.5 / 6.5 / 7 / 7.5 / 6.5 / 7 / 7.5
  donna / woman,eu,35 / 35.5 / 36
  donna / woman,cm,21.6 / 22.5 / 22.4
  donna / woman,uk,2 / 2.5 / 3
  donna / woman,us,3 / 3.5 / 4
  donna / woman,it,3 / 3.5 / 4
```

## Step 2

Now that you have the CSV file, you can use the app to generate the JSON.
To do this, simply upload the CSV file and generate the JSON.
The generated JSON file will be similar to the format below:

```json
[
  {
    "gender": ["uomo", "man"],
    "fields": [
      {
        "locale": "eu",
        "sizes": [39, 40, 40.5, 39, 40, 40.5, 39, 40, 40.5, 39, 40, 40.5]
      },
      {
        "locale": "cm",
        "sizes": [
          24.1, 24.5, 25, 24.1, 24.5, 25, 24.1, 24.5, 25, 24.1, 24.5, 25
        ]
      },
      {
        "locale": "uk",
        "sizes": [6, 6.5, 7, 6, 6.5, 7, 6, 6.5, 7, 6, 6.5, 7]
      },
      {
        "locale": "us",
        "sizes": [6.5, 7, 7.5, 6.5, 7, 7.5, 6.5, 7, 7.5, 6.5, 7, 7.5]
      },
      {
        "locale": "it",
        "sizes": [6.5, 7, 7.5, 6.5, 7, 7.5, 6.5, 7, 7.5, 6.5, 7, 7.5]
      }
    ]
  },
  {
    "gender": ["donna", "woman"],
    "fields": [
      {
        "locale": "eu",
        "sizes": [35, 35.5, 36]
      },
      {
        "locale": "cm",
        "sizes": [21.6, 22.5, 22.4]
      },
      {
        "locale": "uk",
        "sizes": [2, 2.5, 3]
      },
      {
        "locale": "us",
        "sizes": [3, 3.5, 4]
      },
      {
        "locale": "it",
        "sizes": [3, 3.5, 4]
      }
    ]
  }
]
```

## Contributors ✨

Thanks goes to these wonderful people

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Lucas0019"><img src="https://avatars.githubusercontent.com/u/52923100?v=5" width="100px;" alt=""/><br /><sub><b>Lucas Xavier</b></sub></a><br /><a href="https://github.com/vtex-apps/category-menu/commits?author=Lucas0019" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
