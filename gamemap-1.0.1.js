﻿

    var Map = function () {

        this.width = 13;
        this.height = 13;
    }

    $.extend(Map.prototype, {

        /// ==================================
        /// Формирование карты (массива полей)
        /// ==================================
        init: function () {

            this.fields = this.getMapTemplate(this.width, this.height);
            var num;
            for (var r in this.fields) {
                for (var c in this.fields[r]) {
                    var f = this.fields[r][c];
                    if (f.letter == 's') this.fields[r][c] = new SeaField(f.x, f.y, this);
                    else if (f.letter == 'g') {
                        // случайная генерация суши острова
                        num = Math.random() * 2;
                        if (num > 1) this.fields[r][c] = new GrassField(f.x, f.y, this);
                        else this.fields[r][c] = new RockField(f.x, f.y, this);
                    }
                }
            }
        },
        /// ===================================
        /// Получение обобщенного шаблона карты
        /// ===================================
        getMapTemplate: function (width, height) {

            var fields = {};
            var i, j;
            var wlimit = width - 1;
            var hlimit = height - 1;

            for (i = 1; i < wlimit; i++) {
                fields[i] = {};
                for (j = 1; j < hlimit; j++) {
                    fields[i][j] = { letter: 'g', x: i, y: j }
                }
            }

            fields[0] = {};
            fields[wlimit] = {};

            for (i = 0; i < width; i++) {
                fields[0][i] = { letter: 's', x: 0, y: i };
                fields[wlimit][i] = { letter: 's', x: wlimit, y: i };
                fields[i][0] = { letter: 's', x: i, y: 0 };
                fields[i][hlimit] = { letter: 's', x: i, y: hlimit };
            }

            var wlimit = width - 2;
            var hlimit = height - 2;
            fields[1][1] = { letter: 's', x: 1, y: 1 };
            fields[1][hlimit] = { letter: 's', x: 1, y: hlimit };
            fields[wlimit][1] = { letter: 's', x: wlimit, y: 1 };
            fields[wlimit][hlimit] = { letter: 's', x: wlimit, y: hlimit };

            return fields;
        },
        /// =========================================================
        /// Получение рядом расположенного поля относительно входного
        /// и указанного направления
        /// =========================================================
        getField: function (field, direction) {
            switch (direction) {
                case "up":
                    if (field.y <= 0) return;
                    return this.fields[field.x][field.y - 1];
                    break;
                case "down":
                    if (field.y >= this.height - 1) return;
                    return this.fields[field.x][field.y + 1];
                    break;
                case "left":
                    if (field.x <= 0) return;
                    return this.fields[field.x - 1][field.y];
                    break;
                case "right":
                    if (field.x >= this.width - 1) return;
                    return this.fields[field.x + 1][field.y];
                    break;
                case "left-up":
                    if (field.x <= 0) return;
                    if (field.y <= 0) return;
                    return this.fields[field.x - 1][field.y - 1];
                    break;
                case "left-down":
                    if (field.x <= 0) return;
                    if (field.y >= this.height - 1) return;
                    return this.fields[field.x - 1][field.y + 1];
                    break;
                case "right-up":
                    if (field.x >= this.width - 1) return;
                    if (field.y <= 0) return;
                    return this.fields[field.x + 1][field.y - 1];
                    break;
                case "right-down":
                    if (field.x >= this.width - 1) return;
                    if (field.y >= this.height - 1) return;
                    return this.fields[field.x + 1][field.y + 1];
                    break;
            }
        },
        /// ===========================
        /// Отображение карты на экране
        /// ===========================
        draw: function (mapId) {

            var mapElm = $('#' + mapId);
            if (typeof (mapElm) == 'undefined') return;

            var table = $('<table style="border: 1px black solid;"></table>');
            mapElm.append(table);
            for (var j = 0; j < this.height; j++) {
                var tr = $('<tr></tr>');
                table.append(tr);
                for (var i = 0; i < this.width; i++) {
                    var td = $('<td></td>');
                    var img = $('<img />');
                    td.append(img);
                    this.fields[i][j].setView(td);
                    this.fields[i][j].view.drawField();
                    tr.append(td);
                }
            }
        },
        /// =========================================================
        /// Установка обработчиков щелчка мыши (перемещение объектов)
        /// =========================================================
        addEventHandlers: function () {
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    var field = this.fields[i][j];
                    field.view.elm.click(field, function (event) {

                        //alert(event.data.color);
                        var field = event.data;

                        var obj = field.Items.First('movingObject');
                        if (obj != null) {
                            // если щелкнули по объекту - то выделяем его
                            if (currentObject != null) {
                                currentObject.unselect();
                                currentObject.field.behavior.unshowMovingFields();
                            }
                            currentObject = obj;
                            currentObject.select();
                            GlobalPaint();
                        }
                        else if (currentObject != null) {
                            // если щелкнули по пустому полю - перемещаем туда объект
                            if (currentObject.canMove(field)) {
                                currentObject.field.moveObjectToField(field, currentObject);
                                GlobalPaint();
                            }
                            else {
                                alert('Нельзя переместить сюда объект');
                            }
                        }
                    });
                }
            }
        },

        takeObjectHandler: function () {

            if (currentObject != null) {
                var obj = currentObject.field.Items.First('carryingObject');
                if (obj != null) {
                    currentObject.Items.Add(obj);
                    currentObject.field.Items.Remove(obj);
                    GlobalPaint();
                }
            }
        },

        putObjectHandler: function () {

            if (currentObject != null) {
                var obj = currentObject.Items.First('carryingObject');
                if (obj != null) {
                    currentObject.Items.Remove(obj);
                    currentObject.field.Items.Add(obj);
                    GlobalPaint();
                }
            }
        }

    });


    /// ================
    /// Инвентарь пирата
    /// ================
    var Inventory = function () {

        this.width = 2;
        this.height = 2;
        this.fields = {};

        /// =============================
        /// Создание инвенторя в браузере
        /// (привязка к тегу)
        /// =============================
        this.bind = function (equipId) {

            var equipElm = $('#' + equipId);
            if (typeof (equipElm) == 'undefined') return;

            var table = $('<table style="border: 1px black solid;"></table>');
            equipElm.append(table);
            for (var j = 0; j < this.height; j++) {
                var tr = $('<tr></tr>');
                table.append(tr);
                for (var i = 0; i < this.width; i++) {
                    var td = $('<td></td>');
                    var img = $('<img />');
                    td.append(img);
                    this.fields[i + 2 * j] = new ViewField(td);
                    tr.append(td);
                }
            }
        }

        /// ================================
        /// Перерисовка объектов в инвенторе
        /// ================================
        this.draw = function (objdict) {

            var index = 0;
            if (objdict.count > 0) {

                for (k in objdict.objects) {
                    if (objdict.objects.hasOwnProperty(k)) {

                        var obj = objdict.objects[k];
                        this.fields[index++].drawObject(obj.pic);
                        // отображаем максимум 4 объекта
                        if (index == 4) break;
                    }
                }
            }

            while (index < 4) {
                this.fields[index++].undrawObject();
            }
        }

    }


