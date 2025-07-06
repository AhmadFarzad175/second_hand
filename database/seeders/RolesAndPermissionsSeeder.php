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
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Assign permissions to roles
        $adminRole->givePermissionTo($permissions); // Admin gets all
        $userRole->givePermissionTo(['view product']); // User only view

        // Create a default admin user (adjust data as needed)
        $admin = User::firstOrCreate(
            ['email' => 'admin@secondhand.com'],
            [
                'name' => 'Ahmad Admin',
                'phone' => '1234567890',
                'image' => 'default.png', // default image placeholder
                'location' => json_encode(['latitude' => 0, 'longitude' => 0]), // sample JSON
                'password' => Hash::make('123456'), // change password after seed!
                // 'role' => 'admin',
                'is_active' => true,
            ]
        );

        $user = User::firstOrCreate(
            ['email' => 'user@secondhand.com'],
            [
                'name' => 'Ahmad User',
                'phone' => '1234567890',
                'image' => 'default.png', // default image placeholder
                'location' => json_encode(['latitude' => "34.4994965", 'longitude' => "69.146955"]), // sample JSON
                'password' => Hash::make('123456'), // change password after seed!
                // 'role' => 'admin',
                'is_active' => true,
            ]
        );

        // Assign the admin role to the user
        $admin->assignRole($adminRole);
        $user->assignRole($userRole);
    }
}
