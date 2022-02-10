function toMappedOptions(array_options) {
    return array_options.reduce((acc, [k, v]) => {
        acc[k] = v
        return acc
    }, {})
}


const FieldOptions = {

    kinds: (function () {

        const keys = {
            text: 1,
            date: 2,
            choice: 3,
        }

        const select_options = [
            [keys.text, "Текст"],
            [keys.date, "Огноо"],
            [keys.choice, "Сонгох утга"],
        ]

        return {
            ...keys,
            select_options,
            options: toMappedOptions(select_options),
        }

    })(),
}


const KindOptions = {

    entry_kinds: (function () {

        const keys = {
            single_entry: 1,
            doubly_entry: 2,
            multiple_entry: 3,
        }

        const select_options = [
            [keys.single_entry, "Нэг удаа (single entry)"],
            [keys.doubly_entry, "Хоёр удаа (double entry)"],
            [keys.multiple_entry, "Олон удаа (multiple entry)"],
        ]

        return {
            ...keys,
            select_options,
            options: toMappedOptions(select_options),
        }

    })(),
}


const CommonOptions = {

    yesno: (function () {

        const keys = {
            yes: true,
            no: false,
        }

        const select_options = [
            [keys.yes, "Тийм"],
            [keys.no, "Үгүй"],
        ]

        return {
            ...keys,
            select_options,
            options: toMappedOptions(select_options),
        }

    })()

}

const FieldDateOptions = {


    kinds: (function () {

        const keys = {
            none: 1,
            delta: 2,
            date: 3,
        }

        const select_options = [
            [keys.none, "Шалгахгүй"],
            [keys.delta, "[Одоо] + ? хоног"],
            [keys.date, "Огноо заах"],
        ]

        return {
            ...keys,
            select_options,
            options: toMappedOptions(select_options),
        }

    })(),

}

const StatusOptions = {


    status: (function () {

        const keys = {
            new: 1,
            approved: 2,
            declined: 3,
        }

        const select_options = [
            [keys.new, <h6><span className="badge bg-warning">Шинэ хүсэлт</span></h6>],
            [keys.approved, <h6><span className="badge bg-success">Зөвшөөрсөн <i className="bi bi-check2-all"></i></span></h6>],
            [keys.declined, <h6><span className="badge bg-secondary">Татгалзсан <i className="bi bi-x-circle"></i></span></h6>],
        ]

        return {
            ...keys,
            select_options,
            options: toMappedOptions(select_options),
        }

    })(),

}


export {
    FieldOptions,
    KindOptions,
    CommonOptions,
    FieldDateOptions,
    StatusOptions,
}
