
    /// <reference path="/@JSense.js" /> 

        var Car = function() {
            return new MovingObject("pics/ship2.gif", CONST_GROUND_AREA);
        }
        var Chucha = function() {
            return new MovingObject("pics/chucha.gif", CONST_GROUND_AREA);
        }
        var Deer = function() {
            return new MovingObject("pics/deer.gif", CONST_GROUND_AREA);
        }
        var Warrior = function() {
            return new MovingObject("pics/warrior.gif", CONST_GROUND_AREA);
        }
        var Ship = function() {
            return new MovingObject("pics/ship.gif", CONST_SEA_AREA);
        }

        var MovingObject = function (picPath, area) {
            this.selected = false;
            this.area = area;
            this.pic = picPath;
        }

        $.extend(MovingObject.prototype, {

            bindToField: function (field) {
                this.field = field;
            },
            canMove: function(newfield) {
                if (this.area != newfield.area) return false;
                return this.field.canMove(newfield, this.area);
            },
            draw: function () {
                this.field.drawObject();
            },
            move: function(direction) {
                this.field.moveObject(direction);
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
