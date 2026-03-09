import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, UserRole, TableStatus } from '../src/generated/client'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seeding database...')

    // Clean existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.menuItem.deleteMany()
    await prisma.table.deleteMany()
    await prisma.user.deleteMany()
    await prisma.inventoryItem.deleteMany()

    // Create Users
    const hashedPassword = await bcrypt.hash('password123', 12)

    await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@tableflow.com',
            password: hashedPassword,
            role: UserRole.ADMIN,
        },
    })

    await prisma.user.create({
        data: {
            name: 'Kitchen Staff',
            email: 'kitchen@tableflow.com',
            password: hashedPassword,
            role: UserRole.KITCHEN,
        },
    })

    await prisma.user.create({
        data: {
            name: 'Waiter One',
            email: 'waiter@tableflow.com',
            password: hashedPassword,
            role: UserRole.WAITER,
        },
    })
    console.log('✅ Users created')

    // Create Tables
    await Promise.all([
        prisma.table.create({ data: { number: 1, capacity: 2, status: TableStatus.FREE } }),
        prisma.table.create({ data: { number: 2, capacity: 4, status: TableStatus.FREE } }),
        prisma.table.create({ data: { number: 3, capacity: 4, status: TableStatus.FREE } }),
        prisma.table.create({ data: { number: 4, capacity: 6, status: TableStatus.FREE } }),
    ])
    console.log('✅ Tables created')

    // Create Menu Items
    await Promise.all([
        prisma.menuItem.create({ data: { name: 'Burger', description: 'Classic beef burger', price: 12.99, isAvailable: true } }),
        prisma.menuItem.create({ data: { name: 'Pasta Carbonara', description: 'Creamy carbonara with pancetta', price: 14.99, isAvailable: true } }),
        prisma.menuItem.create({ data: { name: 'Caesar Salad', description: 'Garden fresh with croutons', price: 9.99, isAvailable: true } }),
        prisma.menuItem.create({ data: { name: 'Margherita Pizza', description: 'Tomato, mozzarella, basil', price: 13.99, isAvailable: true } }),
        prisma.menuItem.create({ data: { name: 'Grilled Salmon', description: 'With lemon butter sauce', price: 18.99, isAvailable: true } }),
    ])
    console.log('✅ Menu items created')

    // Create Inventory Items
    await Promise.all([
        prisma.inventoryItem.create({ data: { name: 'Beef Patty', unit: 'kg', currentStock: 10, minimumStock: 2 } }),
        prisma.inventoryItem.create({ data: { name: 'Pasta', unit: 'kg', currentStock: 5, minimumStock: 1 } }),
        prisma.inventoryItem.create({ data: { name: 'Salmon Fillet', unit: 'kg', currentStock: 4, minimumStock: 1 } }),
        prisma.inventoryItem.create({ data: { name: 'Mozzarella', unit: 'kg', currentStock: 3, minimumStock: 1 } }),
        prisma.inventoryItem.create({ data: { name: 'Olive Oil', unit: 'L', currentStock: 8, minimumStock: 2 } }),
    ])
    console.log('✅ Inventory items created')

    console.log('🎉 Database seeded successfully!')
}

main()
    .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1) })
    .finally(async () => { await prisma.$disconnect() })