export type InventoryProps ={
    title:string;
    quantity: number;
    action:any;
    btnTitle: string;
    data?:any;
    add?: string;
    selectedId?: any;
};

export type deleteBtnProps = {
    title:string;
    handleDelete: any;
};

export type InventoryDataProps = {
    id: string;
    name: string;
    quantity: number;
    cost: number;
    lifeSpan: number;
    createdAt: Date;
    updatedAt: Date |null;
}[];
