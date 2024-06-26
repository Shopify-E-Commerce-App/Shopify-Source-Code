import prisma from '@/libs/prismadb';

interface IParams{
    productId?: string
}

export default async function getProductbyId(params: IParams){
    try{
        const { productId } = params;
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include:{
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }
        })

        if(!product){
            return null;
        }
    } catch(error: any){
        throw new Error(error);
    }
}