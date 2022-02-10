function splitArray(items, n) {

    const l = Math.ceil(items.length / n)

    return [...Array(n)]
        .map(
            (_, i) => items.slice(i * l, i * l + l)
        )

}

export {
    splitArray,
}
