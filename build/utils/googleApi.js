"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRouteDistance = exports.getCoordinatesForPlaceId = void 0;
const axios_1 = __importDefault(require("axios"));
const default_1 = __importDefault(require("../config/default"));
function getCoordinatesForPlaceId(placeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = default_1.default.GOOGLE_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
        const response = yield axios_1.default.get(url).catch(err => { console.error(err); });
        if ((response === null || response === void 0 ? void 0 : response.status) !== 200)
            return null;
        const { data } = response;
        const coordenates = {
            longitude: data.result.geometry.location.lng,
            latitude: data.result.geometry.location.lat
        };
        return coordenates;
    });
}
exports.getCoordinatesForPlaceId = getCoordinatesForPlaceId;
function calculateRouteDistance(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = default_1.default.GOOGLE_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
        const response = yield axios_1.default.get(url).catch(err => { console.error(err); });
        if ((response === null || response === void 0 ? void 0 : response.status) !== 200)
            return null;
        const { data } = response;
        const distancia = data.rows[0].elements[0].distance.text;
        return distancia;
    });
}
exports.calculateRouteDistance = calculateRouteDistance;
//# sourceMappingURL=googleApi.js.map