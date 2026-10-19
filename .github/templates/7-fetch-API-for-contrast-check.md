## Value Proposition

**As a** Developer

**I want to** check the contrast ratio via an API when colors are added or edited

**in order to** ensure accessibility compliance.

https://github.com/neuefische/web-react-recap-project/assets/93415777/acb2b6f6-6a34-4300-957b-b766de773c7f

### Acceptance Criteria

- An API call is made automatically when a color or contrast text is added or edited.
- The application displays a message indicating whether the contrast ratio is sufficient next to the respective color card.
- While the contrast is being checked, a loading message is shown.

### Tasks

* Use the [WebAIM Contrast Checker API](https://webaim.org/resources/contrastchecker/) to display the overall a11y score for each color.
* Fetch the data with SWR.
* Create a `ContrastChecker` component that is rendered inside each color card and handles the API call.

### Hint

This API takes its parameters as a query string and is called with a GET request. Remove the `#` from the hex values before adding them to the URL:

```javascript
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ContrastChecker({ hex, contrastText }) {
  const { data, isLoading, error } = useSWR(
    `https://webaim.org/resources/contrastchecker/?fcolor=${contrastText.replace("#", "")}&bcolor=${hex.replace("#", "")}&api`,
    fetcher,
  );

  // ...
}
```

💡 SWR fetches again automatically whenever the URL changes, so edited colors are checked without any extra code.

⚠️ Remember the Rules of Hooks: call `useSWR` at the top level of the `ContrastChecker` component, not inside a `map` or a condition.

The response looks like this:

```json
{
  "ratio": "12.7",
  "AA": "pass",
  "AALarge": "pass",
  "AAA": "pass",
  "AAALarge": "pass"
}
```

Use the `AA` field as the overall pass/fail indicator, and `ratio` to show the numeric contrast value.
