import { Button } from "@mui/material";
import React from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

function CustomField() {
  return (
    <div className="bg-white p-3 rounded-lg space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1>Custom Field</h1>
          <p className="text-xs text-gray-400">
            custom fields that can be created 10
          </p>
          <p className="text-xs text-gray-400">1 Record Found</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p>Remaining custom field : 9</p>
          <button className="bg-[#0E5073] hover:bg[#003049] text-white flex items-center p-2 rounded-md">
            <PlusIcon className="text-white 5 w-5" aria-hidden="true" /> Add
            Custom Field
          </button>
        </div>
      </div>

      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Custom Field
              </th>
              <th scope="col" class="py-3 px-6">
                Screen
              </th>
              <th scope="col" class="py-3 px-6">
                Field Type
              </th>
              <th scope="col" class="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Pos Code
              </th>
              <td class="py-4 px-6">Contact Details</td>
              <td class="py-4 px-6">Text or Number</td>
              <td class="py-4 px-6">
                <div className="flex flex-row gap-3">
                  <a
                    href="#"
                    className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                  >
                    <TrashIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="#"
                    className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                  >
                    <PencilIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomField;
