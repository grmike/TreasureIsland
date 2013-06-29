
    /// <reference path="/@JSense.js" /> 

        var Car = function(id) {
            return new MovingObject("pics/ship2.gif", CONST_GROUND_AREA, id);
        }
        var Chucha = function(id) {
            return new MovingObject("pics/chucha.gif", CONST_GROUND_AREA, id);
        }
        var Deer = function(id) {
            return new MovingObject("pics/deer.gif", CONST_GROUND_AREA, id);
        }
        var Warrior = function(id) {
            return new MovingObject("pics/warrior.gif", CONST_GROUND_AREA, id);
        }
        var Ship = function(id) {
            return new MovingObject("pics/ship.gif", CONST_SEA_AREA, id);
        }

        var MovingObject = function (picPath, area, id) {
            this.id = id;
            this.selected = false;
            this.area = area;
            this.pic = picPath;
            this.isMovingObject = true;
        }

        $.extend(MovingObject.prototype, {

            bindToField: function (field) {
                this.field = field;
            },
            
            canMove: function(newfield) {
                if (this.area != newfield.area) return false;
                return this.field.canMove(newfield, this.area);
            },
            //draw: function () {
            //    this.field.drawObject(this.field.object);
            //},
            move: function(direction) {
                this.field.moveObject(this, direction);
            },
            select: function () {
                this.selected = true;
                this.field.select(this.area);
            },
            unselect: function () {
                this.selected = false;
                this.field.view.unselectObject();
            },

        });


        var OneCoin = function(id) {
            return new MapObject("pics/onecoin.gif", CONST_GROUND_AREA, id);
        }
        var FourCoins = function(id) {
            return new MapObject("pics/fourcoins.gif", CONST_GROUND_AREA, id);
        }
        var FiveCoins = function(id) {
            return new MapObject("pics/fivecoins.gif", CONST_GROUND_AREA, id);
        }

        var MapObject = function (picPath, area, id) {
            this.id = id;
            this.selected = false;
            this.area = area;
            this.pic = picPath;
            this.isMovingObject = false;
        }

        $.extend(MapObject.prototype, {

            bindToField: function (field) {
                this.field = field;
            }
            //draw: function () {
            //    this.field.drawObject(this.field.object);
           // }
        });
