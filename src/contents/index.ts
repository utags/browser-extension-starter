import { $, createElement, setStyle } from "browser-extension-utils"

import { addValueChangeListener, getValue, setValue } from "../storage/index"
import test from "../storage/test"

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
process.env.PLASMO_TAG === "dev" && test()

function showVisitCount(visitCount: string) {
  const div = $("#myprefix_div") || createElement("div")
  div.id = "myprefix_div"
  div.innerHTML = String(visitCount)
  setStyle(
    div,
    "display: block; position: fixed; top: 50px; right: 50px; background-color: yellow; z-index: 100000;"
  )
  document.body.append(div)
}

async function main() {
  if (!document.body) {
    return
  }

  const visitCount = (await getValue("visitCount")) || "0"
  let visitCountInt = Number.parseInt(visitCount, 10)
  showVisitCount(String(++visitCountInt))
  await setValue("visitCount", visitCountInt)

  addValueChangeListener("visitCount", async () => {
    const visitCount = (await getValue("visitCount")) || "0"
    showVisitCount(visitCount)
  })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
main()
