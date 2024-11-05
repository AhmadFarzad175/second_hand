<?php

namespace App\Traits;

use Illuminate\Support\Facades\File;

trait ImageManipulation
{

    /*
        HOW IT WORKS:
            - in store method we pass the request, validated data, folder that we want to
              store in it, and the name which indicates attribute of request which holds
              the image. ex: validated["photo"] is photo, and validated["tazkira"] is tazkira.

            - update method works the same as store method.
    */

    public function updateImage($model, $request, &$validated, $folder, $name)
    {
         // If the user did not upload a new photo, set the URL of the old photo
         if (!$request->hasFile($name)) {
            $validated[$name] = $model->$name;
        } else {

            // delete the old image
            $this->deleteImage($model, $folder, $name);

            // store the new image
            $this->storeImage($request, $validated, $folder, $name);
        }
    }

    public function storeImage($request, &$validated, $folder, $name)
    {
        $validated[$name] = $request->file($name)->store($folder, 'public');
    }



    public function deleteImage($model, $folder, $name)
    {
        $path = public_path("storage/images/" . "$folder/" . basename($model->$name));
        File::exists($path) ? File::delete($path) : null;
    }
    

    // for employee's controller

}
