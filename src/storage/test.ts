import { assertEquals, runTest } from "../utils/test-helper"
import { addValueChangeListener, getValue, setValue } from "./index"

export default async function test() {
  await runTest("storage", async () => {
    console.log(
      `[${process.env.PLASMO_TARGET}] [${process.env.PLASMO_TAG}] runs on`,
      location.href
    )

    const key = "test_" + Date.now()
    let value = await getValue(key)
    console.log("getValue newKey", value)
    assertEquals(value, undefined)

    await setValue(key, undefined)
    value = await getValue(key)
    console.log("setValue undefined", "getValue", value)
    assertEquals(value, undefined)

    await setValue(key, null)
    value = await getValue(key)
    console.log("setValue null", "getValue", value)
    assertEquals(value, null)

    await setValue(key, undefined)
    value = await getValue(key)
    console.log("setValue undefined", "getValue", value)
    assertEquals(value, null)

    await setValue(key, 123)
    value = await getValue(key)
    console.log("setValue 123", "getValue", value)
    assertEquals(value, 123)

    await setValue(key, undefined)
    value = await getValue(key)
    console.log("setValue undefined", "getValue", value)
    assertEquals(value, 123)

    await setValue(key, null)
    value = await getValue(key)
    console.log("setValue null", "getValue", value)
    assertEquals(value, null)

    await setValue(key, "abc")
    value = await getValue(key)
    console.log("setValue abc", "getValue", value)
    assertEquals(value, "abc")

    await setValue(key, undefined)
    value = await getValue(key)
    console.log("setValue undefined", "getValue", value)
    assertEquals(value, "abc")

    await setValue(key, null)
    value = await getValue(key)
    console.log("setValue null", "getValue", value)
    assertEquals(value, null)

    await setValue(key, [1, 2, 3])
    value = await getValue(key)
    console.log("setValue [1, 2, 3]", "getValue", value)
    assertEquals(JSON.stringify(value), JSON.stringify([1, 2, 3]))

    await setValue(key, undefined)
    value = await getValue(key)
    console.log("setValue undefined", "getValue", value)
    assertEquals(JSON.stringify(value), JSON.stringify([1, 2, 3]))

    await setValue(key, null)
    value = await getValue(key)
    console.log("setValue null", "getValue", value)
    assertEquals(value, null)
  })
}
