

export interface Dragaable{
    dragStartHandler(event: DragEvent):void;
    dragEndHandler(event: DragEvent):void;
} 
export interface DragTarget{
    dragOverHandler(event: DragEvent):void;
    dropHandler(event: DragEvent):void;
    dragLeaveHandler(event: DragEvent):void;
}