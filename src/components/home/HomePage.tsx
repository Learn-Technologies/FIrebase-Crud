import {
  useAddList,
  useDeleteList,
  useLists,
} from "@/src/components/services/FirebaseApis";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "../common/Modal";
import HomeLists from "./HomeLists";
import Utils from "../services/Utils";
interface IFormInput {
  firstName: string;
  lastName: string;
}
const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
  })
  .required();

export default function HomePage() {
  const addList = useAddList();
  const getLists = useLists();
  const deleteList = useDeleteList();
  const [isEditObj, setEditObj] = React.useState<Object | null>(null);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const objForm = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: !!isEditObj ? isEditObj : {},
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    const res = await addList.mutateAsync(data);
    window.alert("Data added successfully");
    objForm.reset();
    setModalOpen(false);
    setEditObj(null);
  };
  React.useEffect(() => {
    if (!!isEditObj) objForm.reset(isEditObj);
  }, [!!isEditObj]);

  async function handleDelete(data: any) {
    if (!(await Utils.showAlert())) return;
    await deleteList.mutateAsync(data);
    getLists.refetch();
  }
  return (
    <div className="">
      <div className="flex justify-between items-center mx-10 bg-[#f0f0f0f0]">
        <h1 className="m-10 text-3xl font-semibold">Listing Items</h1>
        <Button
          placeholder=""
          className="m-10"
          onClick={() => setModalOpen(!isModalOpen)}
        >
          Add List
        </Button>
      </div>
      {/* <button onClick={() => Utils.showAlert()}>show alert</button> */}
      <HomeLists
        getLists={getLists}
        setEditObj={setEditObj}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
      />

      <Modal
        isModalOpen={isModalOpen}
        header="Add Update Modal"
        setModalOpen={() => {
          setModalOpen(false);
          setEditObj(null);
        }}
        childComponent={
          <>
            <form onSubmit={objForm.handleSubmit(onSubmit)}>
              <div className="">
                <div className="w-full ">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=""
                      {...objForm.register("firstName")}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      First Name
                    </label>
                  </div>
                </div>
                <p className="text-red-500">
                  {objForm.formState.errors.firstName?.message}
                </p>
                <div className="w-full mt-2">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=""
                      {...objForm.register("lastName")}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Last Name
                    </label>
                  </div>
                </div>
                <p className="text-red-500">
                  {objForm?.formState.errors?.lastName?.message}
                </p>
              </div>
              <Button placeholder="" className="mt-2" type="submit">
                Submit
              </Button>
            </form>
          </>
        }
      />
    </div>
  );
}
