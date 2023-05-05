import { Directive, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';
import { LeafletUtil } from '../core/leaflet.util';
/**
 * Layer directive
 *
 * This directive is used to directly control a single map layer. The purpose of this directive is to
 * be used as part of a child structural directive of the map element.
 *
 */
var LeafletLayerDirective = /** @class */ (function () {
    function LeafletLayerDirective(leafletDirective, zone) {
        this.zone = zone;
        // Layer Events
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletLayerDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
    };
    LeafletLayerDirective.prototype.ngOnDestroy = function () {
        if (null != this.layer) {
            // Unregister the event handlers
            this.removeLayerEventListeners(this.layer);
            // Remove the layer from the map
            this.layer.remove();
        }
    };
    LeafletLayerDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['layer']) {
            // Update the layer
            var p_1 = changes['layer'].previousValue;
            var n_1 = changes['layer'].currentValue;
            this.zone.runOutsideAngular(function () {
                if (null != p_1) {
                    _this.removeLayerEventListeners(p_1);
                    p_1.remove();
                }
                if (null != n_1) {
                    _this.addLayerEventListeners(n_1);
                    _this.leafletDirective.getMap().addLayer(n_1);
                }
            });
        }
    };
    LeafletLayerDirective.prototype.addLayerEventListeners = function (l) {
        var _this = this;
        this.onAddLayerHandler = function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onAdd, e); };
        l.on('add', this.onAddLayerHandler);
        this.onRemoveLayerHandler = function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onRemove, e); };
        l.on('remove', this.onRemoveLayerHandler);
    };
    LeafletLayerDirective.prototype.removeLayerEventListeners = function (l) {
        l.off('add', this.onAddLayerHandler);
        l.off('remove', this.onRemoveLayerHandler);
    };
    LeafletLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[leafletLayer]'
                },] }
    ];
    LeafletLayerDirective.ctorParameters = function () { return [
        { type: LeafletDirective },
        { type: NgZone }
    ]; };
    LeafletLayerDirective.propDecorators = {
        layer: [{ type: Input, args: ['leafletLayer',] }],
        onAdd: [{ type: Output, args: ['leafletLayerAdd',] }],
        onRemove: [{ type: Output, args: ['leafletLayerRemove',] }]
    };
    return LeafletLayerDirective;
}());
export { LeafletLayerDirective };
//# sourceMappingURL=leaflet-layer.directive.js.map