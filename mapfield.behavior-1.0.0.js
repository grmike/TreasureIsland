

var FieldBehavior = function (map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
}

$.extend(FieldBehavior.prototype, {
    getPathFields: function () {
        if (typeof (this.pathfields) == "undefined") {
            var self = this;
            self.pathfields = {};
            var t = this.getMovingFields();
            t.forEach(function (element, index) {
                var each = self.map.getField(self, element);
                if (typeof (each) != "undefined") self.pathfields[each.name] = each;
            });
        }
        return this.pathfields;
    },
    showMovingFields: function (area) {
        var flds = this.getPathFields();
        for (var each in flds) {
            if (flds[each].area == area) flds[each].view.selectForMove();
        }
    },
    unshowMovingFields: function () {
        var flds = this.getPathFields();
        for (var each in flds) {
            flds[each].view.unselectForMove();
        }
    },
    getMovingFields: function () {
        return ["up", "down", "left", "right", "left-up", "left-down", "right-up", "right-down"];
    }
});
