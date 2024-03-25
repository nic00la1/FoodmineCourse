import { Model, Schema, Types } from "mongoose";
import { Food, FoodSchema } from "./food.models";

export interface LatLng {
  lat: number;
  lng: number;
}

export const LatLngSchema = new Schema<LatLng>({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

export interface OrderItem {
  food: Food;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
