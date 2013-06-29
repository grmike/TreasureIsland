

var ViewField = function (elm, pic, color) {
    this.elm = elm;
    this.pic = pic;
    this.color = color;
}

$.extend(ViewField.prototype, {

    drawField: function () {
        if (typeof (this.pic) == 'undefined') this.elm.css("backgroundColor", this.color);
        else this.elm.css("backgroundImage", "url(" + this.pic + ")").css("opacity", "1");
    },
    selectObject: function () {
        this.elm.css("backgroundImage", "").css("backgroundColor", "red").css("opacity", "0.8");
    },
    unselectObject: function () {
        this.drawField();
    },
    selectForMove: function () {
        this.elm.css("opacity", "0.8");
    },
    unselectForMove: function () {
        this.elm.css("opacity", "1");
    },
    drawObject: function (objectPicture) {
        $(":first-child", this.elm).attr("src", objectPicture);
    },
    undrawObject: function () {
        $(":first-child", this.elm).attr("src", "pics/empty.gif");
    }
});
