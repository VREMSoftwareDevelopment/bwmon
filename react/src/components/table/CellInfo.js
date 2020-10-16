export default class CellInfo {
    constructor(id, sortable, align, label, footer, convert) {
        this.id = id;
        this.sortable = sortable;
        this.align = align;
        this.label = label;
        this.footer = footer;
        this.convert = convert;
    }
}
