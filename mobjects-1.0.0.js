
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
            canMove: function(field) {
                return this.area == field.area;
            },
            draw: function () {
                this.field.draw(this.pic);
                if (this.selected) this.field.select();
            },
            undraw: function () {
                this.field.removeObject();
                this.field.draw();
                if (this.selected) this.field.unselect();
            },
            moveUp: function() {
                this.undraw();
                var newfield = this.field.map.getUpField(this.field);
                newfield.addObject(this);
                this.draw();
            },
            moveDown: function() {
                this.undraw();
                var newfield = this.field.map.getDownField(this.field);
                newfield.addObject(this);
                this.draw();
            },
            moveLeft: function() {
                this.undraw();
                var newfield = this.field.map.getLeftField(this.field);
                newfield.addObject(this);
                this.draw();
            },
            moveRight: function() {
                this.undraw();
                var newfield = this.field.map.getRightField(this.field);
                newfield.addObject(this);
                this.draw();
            },
            select: function () {
                this.selected = true;
                this.field.select();
            },
            unselect: function () {
                this.selected = false;
                this.field.unselect();
            },

        });
