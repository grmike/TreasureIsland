
    /// <reference path="/@JSense.js" /> 

        var ObjectFactory = function () {
            this.index = 0;
        }

        $.extend(ObjectFactory.prototype, {

            getCar: function() {
                return new MovingObject("pics/ship2.gif", CONST_GROUND_AREA, this.index++);
            },

            getChucha: function() {
                return new MovingObject("pics/chucha.gif", CONST_GROUND_AREA, this.index++);
            },

            getDeer: function() {
                return new MovingObject("pics/deer.gif", CONST_GROUND_AREA, this.index++);
            },

            getWarrior: function() {
                return new MovingObject("pics/warrior.gif", CONST_GROUND_AREA, this.index++);
            },

            getShip: function() {
                return new MovingObject("pics/ship.gif", CONST_SEA_AREA, this.index++);
            },

            getOneCoin: function() {
                return new MapObject("pics/onecoin.gif", CONST_GROUND_AREA, this.index++);
            },

            getFourCoins: function() {
                return new MapObject("pics/fourcoins.gif", CONST_GROUND_AREA, this.index++);
            },

            getFiveCoins: function() {
                return new MapObject("pics/fivecoins.gif", CONST_GROUND_AREA, this.index++);
            }

        });


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
