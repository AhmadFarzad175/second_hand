<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Clear cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions your app needs
        $permissions = [
            'create product',
            'edit product',
            'delete product',
            'view product',
            'manage users',
            'viewCategory',
            'createCategory',
            'editCategory',
            'deleteCategory',
            'viewUser',
            'createUser',
            'editUser',
            'deleteUser',
        ];

        // Create permissions if they don't exist
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles matching your DB enum
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Assign permissions to roles
        $adminRole->givePermissionTo($permissions); // Admin gets all
        $managerRole->givePermissionTo(['create product', 'edit product', 'view product']); // Manager limited
        $userRole->givePermissionTo(['view product']); // User only view

        // Create a default admin user (adjust data as needed)
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@secondhand.com'],
            [
                'name' => 'Admin User',
                'phone' => '1234567890',
                'image' => 'default.png', // default image placeholder
                'location' => json_encode(['lat' => 0, 'lng' => 0]), // sample JSON
                'password' => Hash::make('password123'), // change password after seed!
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        // Assign the admin role to the user
        $adminUser->assignRole($adminRole);
    }
}


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;
//    use Spatie\Permission\Models\Role;
// use Spatie\Permission\Models\Permission;

// class RolePermissionSeeder extends Seeder
// {

// public function run()
// {
//     // Permissions
//     $permissions = [
//         'create product',
//         'edit product',
//         'delete product',
//         'view product',
//         'manage users',
//     ];

//     foreach ($permissions as $permission) {
//         Permission::firstOrCreate(['name' => $permission]);
//     }

//     // Roles
//     $admin = Role::firstOrCreate(['name' => 'admin']);
//     $seller = Role::firstOrCreate(['name' => 'seller']);
//     $buyer = Role::firstOrCreate(['name' => 'buyer']);

//     // Assign permissions to roles
//     $admin->givePermissionTo(Permission::all());
//     $seller->givePermissionTo(['create product', 'edit product', 'delete product', 'view product']);
//     $buyer->givePermissionTo(['view product']);
// }
// }
