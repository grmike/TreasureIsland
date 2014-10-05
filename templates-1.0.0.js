


var paintingObjects = [];


function GlobalPaint() {

    //alert(paintingObjects.length);
    if (paintingObjects.length == 0) return;

    while (paintingObjects.length > 0) {
        var obj = paintingObjects.pop();
        obj.paint();
        //alert(paintingObjects.length);
    }
}


var ObjectsDict = function (owner) {
    this.objects = {};
    this.count = 0;
    this.owner = owner;
}

$.extend(ObjectsDict.prototype, {

    Add: function (obj) {
        this.objects[obj.id] = obj;
        this.count++;
        obj.setOwner(this.owner);
        paintingObjects.push(this.owner);
    },

    Remove: function (obj) {
        delete this.objects[obj.id];
        this.count--;
        paintingObjects.push(this.owner);
    },

    First: function (type) {

        for (k in this.objects) {
            if (this.objects.hasOwnProperty(k)) {

                if (type == null) {
                    return this.objects[k];

                } else if (type == 'movingObject') {
                    if (this.objects[k].isMovingObject) {
                        return this.objects[k];
                    }
                }
                else if (type == 'carryingObject') {
                    if (this.objects[k].isCarryingObject) {
                        return this.objects[k];
                    }
                }
                else return null;
            }
        }
        return null;
    }
});
