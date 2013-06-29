

    var CONST_SEA_AREA = 1;
    var CONST_GROUND_AREA = 2;
    var CONST_ALL_AREA = 3;


    var RockField = function (x, y, map) {
        return new MapField('Green', CONST_GROUND_AREA, "pics/rocks.gif", x, y, map);
    }

    var SeaField = function (x, y, map) {
        return new MapField('Blue', CONST_SEA_AREA, "pics/sea.gif", x, y, map);
    }

    var GrassField = function (x, y, map) {
        return new MapField('Green', CONST_GROUND_AREA, "pics/grass.gif", x, y, map);
    }

    var MapField = function (color, area, img, x, y, map) {
        this.map = map;
        this.behavior = new FieldBehavior(map, x, y);
        this.color = color;
        this.pic = img;

        this.object = null;
        this.objects = {};
        this.area = area;
        this.x = x;
        this.y = y;
        this.name = x.toString() + "," + y.toString();
    }

    $.extend(MapField.prototype, {
        setView: function (elm) {
            this.view = new ViewField(elm, this.pic, this.color);
        },
        addObject: function (obj) {
            this.objects[obj.id] = obj;
            //this.object = obj;
            obj.bindToField(this);
            this.drawObjects(obj);
            //this.drawObject(obj);
        },
        removeObject: function (obj) {
            delete this.objects[obj.id];
            //this.object = null;
            this.drawObjects();
            //this.view.undrawObject();
        },
        select: function (area) {
            this.view.selectObject();
            this.behavior.showMovingFields(area);
        },
        undrawObject: function (obj) {
            if (obj.selected) {
                this.view.unselectObject();
                this.behavior.unshowMovingFields();
            }
            this.removeObject(obj);
            //this.view.undrawObject();
        },
        drawObjects: function (obj) {
            if (typeof (obj) != "undefined") {
                this.view.drawObject(obj.pic);
                if (obj.selected) this.select(obj.area);
            }
            else {
                var lobj = null;
                for (k in this.objects) {
                    if (this.objects.hasOwnProperty(k)) {
                        lobj = this.objects[k];
                        break;
                    }
                }
                if (lobj != null) {
                    this.view.drawObject(lobj.pic);
                }
                else this.view.undrawObject();
            }
        },
        drawObject: function (obj) {
            this.view.drawObject(obj.pic);
            if (obj.selected) this.select(obj.area);
        },
        canMove: function (newfield, area) {
            var flds = this.behavior.getPathFields();
            if (typeof (flds[newfield.name]) == "undefined") return false;
            return flds[newfield.name].area == area;
        },
        moveObject: function (obj, direction) {
            var newfield = this.map.getField(this, direction);
            if (obj.canMove(newfield)) this.moveObjectToField(newfield, obj);
        },
        moveObjectToField: function (newfield, obj) {
            //var o = this.object;
            this.undrawObject(obj);
            newfield.addObject(obj);
            //newfield.drawObject(obj);
        }
    });

