"use client";

import { useToast } from "@/hooks/use-toast";
import { formSchema } from "@/lib/validations";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const StartupForm = ({}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);
      //   const result = await createIdea(prevSatte,formData,pitch)
      //   console.log((result))

      //   if (result.status === "SUCCESS") {
      //     toast({
      //       title: "Success",
      //       description: "Form submitted successfully",
      //       className: "bg-green-500 text-white",
      //     });
      //     router.push(`/startup/${result.id}`);
      //   }
      //   return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Validation Error",
          description: "Please check the form for errors.",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });

        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      }

      toast({
        title: "Validation Error",
        description: "An unexpected error occurred",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    } finally {
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  useEffect(() => setIsLoading(true), []);
  if (!isLoading) return null;

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          type="text"
          name="title"
          id="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          name="description"
          id="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />

        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          type="text"
          name="category"
          id="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Business, etc.)"
        />

        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          type="text"
          name="link"
          id="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{ placeholder: "Briefly describe your idea and what problem it solves." }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <Button disabled={isPending} type="submit" className="startup-form_btn text-white">
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
