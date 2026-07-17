/**
 * getRequestedAddons
 *
 * Scenario: an online store order that can contain several sub-orders, and each
 * sub-order has "add-on" items the customer has requested. This function:
 *   1. Collects every requested add-on item across all active sub-orders.
 *   2. Looks up a specific sub-order by id to decide whether the customer has a
 *      premium membership (which unlocks extra catalog products).
 *   3. Builds a combined product list from the base catalog and (optionally)
 *      the premium catalog, keeping only products that are in stock.
 *   4. Matches the in-stock products against the requested add-on items by sku.
 *   5. Sums the prices of all requested add-on items.
 *
 */

export type AddonItem = {
    sku: string;
    status: string;
    price?: number;
};

export type Membership = {
    status: string;
};

export type Order = {
    id: string;
    isActive: boolean;
    addonItems: AddonItem[];
    membership?: Membership | null;
};

export type Product = {
    sku: string;
    inStock: boolean;
    name?: string;
};

export type TaggedProduct = Product & {
    isPremium: boolean;
};

export type Catalog = {
    products: Product[];
    premiumProducts: Product[];
};

export type OrderData = {
    orders: Order[];
    catalog?: Catalog;
};

export type RequestedAddonsResult = {
    matchedProducts: TaggedProduct[];
    totalAmount: number;
    hasRequestedItems: boolean;
};

export const getRequestedAddons = (
    orderData: OrderData | null,
    orderId?: string,
): RequestedAddonsResult => {
    //old way without optional chaining
    const activeOrdersOld = orderData.orders;

    if (!orderData) {
        return {
            matchedProducts: [],
            totalAmount: 0,
            hasRequestedItems: false,
        };
    }

    const activeOrders = orderData.orders.filter((order) => order.isActive);
    const requestedItems = activeOrders
        ?.flatMap((order) => order.addonItems)
        .filter((item) => item.status === "requested");

    const order = orderData?.orders?.find((order) => order.id === orderId);
    const hasPremiumMembership = order?.membership?.status === "active";
    const includePremium = orderId ? hasPremiumMembership : true;

    const baseProducts: TaggedProduct[] =
        orderData?.catalog?.products.map((product) => ({
            isPremium: false,
            ...product,
        })) ?? [];

    const premiumProducts: TaggedProduct[] = includePremium
        ? (orderData?.catalog?.premiumProducts ?? []).map((product) => ({
              isPremium: true,
              ...product,
          }))
        : [];

    const allProducts = [...baseProducts, ...premiumProducts]?.filter(
        (product) => product.inStock,
    );

    const matchedProducts = allProducts?.filter((product) =>
        requestedItems?.find((item) => item.sku === product.sku),
    );

    const hasRequestedItems =
        !!requestedItems?.length && requestedItems?.length > 0;

    const totalAmount =
        requestedItems?.reduce((prev, curr) => {
            if (!curr?.price) {
                return prev;
            }
            return prev + curr.price;
        }, 0) ?? 0;

    return {
        matchedProducts,
        totalAmount,
        hasRequestedItems,
    };
};
