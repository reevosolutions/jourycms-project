"use client";

import {useSdk} from "@/hooks/use-sdk";
import initLogger, {LoggerContext} from "@/lib/logging";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Listing from "..";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Link from "next/link";
import BreadcrumbComponent from "../../presentation/breadcrumb";
import CustomPagination from "../../presentation/pagination";
import {Button} from "@/components/ui/button";
import {LuDelete, LuLoader2, LuSearch, LuX} from "react-icons/lu";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Input} from "@/components/ui/input";
import {adminRoutes} from "@/config";
import {setPathParams} from "@/lib/routes";
import {toast} from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const logger = initLogger(LoggerContext.FORM, "formEntry");

import EntityAlias = Levelup.CMS.V1.Content.Entity.FormEntry;
import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;
import {Label} from "@/components/ui/label";
type FormEntryListProps = {
  form_id?: string;
  /**
   * @default true
   */
  showTitle?: boolean;
};

const FormEntryList: React.FC<FormEntryListProps> = ({
  form_id,
  showTitle = true,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [form, setForm] = useState<Levelup.CMS.V1.Content.Entity.Form | null>(
    null,
  );
  const [filteredItems, setFilteredItems] = useState<EntityAlias[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [items, setItems] = useState<EntityAlias[]>([]);
  const [count, setCount] = useState(24);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [_search, set_Search] = useState("");
  const [fields, setFields] = useState<
    Levelup.CMS.V1.Utils.Api.Request.TProjectableFields<EntityAlias>[]
  >([
    "slug",
    "data",
    "form",
    "created_at",
    "created_by",
    "updated_at",
    "is_handled",
  ]);
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  const formQuery = useQuery({
    queryKey: ["form", form_id],
    enabled: !!form_id,
    queryFn: async () => {
      if (form_id) {
        const data = await sdk.content.forms.getById(form_id);
        setForm(data?.data || null);
        return data;
      }
      return null;
    },
  });

  const {data, error, refetch, isFetching, isFetched} = useQuery({
    queryKey: ["form-entry", form?._id, _search, page, count, fields],
    enabled: !!form?._id,

    queryFn: async () => {
      if (form) {
        const data = await sdk.content.formEntries.list({
          count: count,
          page: page,
          search: _search,
          filters: {
            form: form._id,
          },
          fields,
        });
        return data;
      }
    },
  });

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [isExporting, setIsExporting] = useState(false);
  const [isExported, setIsExported] = useState(false);
  const [exportResult, setExportResult] =
    useState<Levelup.CMS.V1.Content.Api.FormEntries.Export.Response | null>(
      null,
    );
  const [handledFilter, setHandledFilter] = useState<
    "all" | "handled" | "not_handled"
  >("all");

  /* -------------------------------------------------------------------------- */
  /*                                    FORMS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const loadExtraData = useCallback(() => {}, []);
  const handleSearch = useCallback((search: string) => {
    setPage(1);
    set_Search(search);
  }, []);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    setIsExported(false);
    setExportResult(null);
    try {
      console.clear();
      const data = await sdk.content.formEntries.export({
        filters: {
          form: form?._id || "",
          is_handled:
            handledFilter === "handled"
              ? true
              : handledFilter === "not_handled"
                ? false
                : undefined,
        },
      });

      if (data?.data?.id) {
        const url = sdk.content.getExportFileUrl("formEntry", data?.data?.id);
        logger.value("exportUrl", url);
        setIsExported(true);
        setExportResult(data);
      } else {
        throw new Error("Invalid export data");
      }

      toast.success("تم تصدير البيانات");
    } catch {
      toast.error("حدث خطأ أثناء تصدير البيانات");
      setIsExported(false);
      setExportResult(null);
    }
    setIsExporting(false);
  }, [form?._id, handledFilter, sdk.content]);
  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData, items]);

  useEffect(() => {
    setItems(data?.data || []);
  }, [data?.data]);

  useEffect(() => {
    setFilteredItems(items);
    setIsDataLoaded(true);
  }, [items]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="form-group upcms-formEntry-list min-h-screen">
      <div className="flex flex-row gap-4">
        <section className="flex-grow pt-6">
          <div className="mb-4">
            <BreadcrumbComponent
              items={[
                {
                  title: tLabel("الرئيسية"),
                  path: `/admin/`,
                },
                {
                  title: tLabel("النماذج"),
                  path: adminRoutes.forms._.list.path,
                },
                {
                  title: form?.name || tLabel("Form"),
                  path: setPathParams(adminRoutes.forms._.edit.path, {
                    id: form_id,
                  }),
                },
                {
                  title: tLabel("Form Entries"),
                  path: setPathParams(adminRoutes.forms._.entries.path, {
                    id: form_id,
                  }),
                },
              ]}
            />
          </div>
          {showTitle && (
            <h1 className="up-page-title mb-4 flex items-center justify-between text-xl font-bold">
              {tLabel("Form Entries")}
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => refetch()}
                  className=""
                  variant={"secondary"}
                >
                  {isFetching && <LuLoader2 className="animate-spin" />}
                  {"تحديث"}
                </Button>
                {data?.data?.length && form?._id ? (
                  <>
                    <Dialog
                      onOpenChange={open => {
                        if (!open) {
                          setIsExported(false);
                          setExportResult(null);
                          setIsExporting(false);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant={"default"}>{"تصدير"}</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader dir="rtl">
                          <DialogTitle dir="rtl">
                            تصدير مدخلات النموذج
                          </DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="">
                            <Label
                              htmlFor="name"
                              className="mb-4 block text-text-600"
                            >
                              المدخلات التي سيتم تصديرها
                            </Label>
                            <RadioGroup
                              value={handledFilter}
                              onValueChange={value => {
                                setHandledFilter(value as any);
                                setIsExported(false);
                              }}
                            >
                              <div className="flex flex-col gap-2" dir="rtl">
                                <Label className="flex cursor-pointer items-center gap-3">
                                  <RadioGroupItem value="all" />
                                  <span className="d">الكل</span>
                                </Label>
                                <Label className="flex cursor-pointer items-center gap-3">
                                  <RadioGroupItem value="handled" />
                                  <span className="d">التي تم مراجعتها</span>
                                </Label>
                                <Label className="flex cursor-pointer items-center gap-3">
                                  <RadioGroupItem value="not_handled" />
                                  <span className="d">
                                    التي لم يتم مراجعتها
                                  </span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                          {isExported && exportResult?.data?.id ? (
                            <div className="mt-4 flex flex-col items-center gap-0 rounded-xl border border-green-100 p-4 py-6">
                              <Label
                                htmlFor="name"
                                className="mb-4 block text-xl text-text-600"
                              >
                                تم تصدير المدخلات بنجاح
                              </Label>
                              <a
                                href={sdk.content.getExportFileUrl(
                                  "formEntry",
                                  exportResult?.data?.id,
                                )}
                                target="_blank"
                                className="inline-flex gap-4 rounded-lg bg-primary-700 px-4 pb-1 pt-2 text-lg font-bold text-white transition hocus:bg-primary-900 sm:px-6 md:px-8"
                              >
                                {"تحميل الملف"}
                              </a>
                            </div>
                          ) : null}
                        </div>
                        {isExported && exportResult?.data?.id ? null : (
                          <DialogFooter>
                            <button
                              className="inline-flex gap-4 rounded-lg bg-darkblue-700 px-4 pb-2 pt-3 text-lg font-bold text-white transition-all disabled:opacity-50 hocus:bg-darkblue-900 sm:px-6 md:px-8"
                              type="submit"
                              disabled={isExporting}
                              onClick={handleExport}
                            >
                              {isExporting && (
                                <LuLoader2 className="animate-spin" />
                              )}
                              {isExporting ? "جار التصدير" : "تصدير"}
                            </button>
                          </DialogFooter>
                        )}
                      </DialogContent>
                    </Dialog>
                  </>
                ) : null}
              </div>
            </h1>
          )}

          {error ? (
            <Alert variant={"destructive"}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : isFetched && isDataLoaded && !isFetching ? (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <Input
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    onKeyDown={event => {
                      if (event.key === "Enter") {
                        handleSearch(search);
                      }
                    }}
                    placeholder="ابحث عن مدخل"
                  />

                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setSearch("");
                      handleSearch("");
                    }}
                    disabled={!search}
                  >
                    <LuX className="h-6 w-6" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      handleSearch(search);
                    }}
                    disabled={!search}
                  >
                    <LuSearch className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              {filteredItems.length > 0 ? (
                <>
                  <Listing.FormEntries.FormEntryListTable
                    form={form}
                    data={filteredItems}
                    edge={data?.edge}
                  />
                  {(data?.pagination?.pages || 0) > 1 && (
                    <div className="my-8 mt-12">
                      <CustomPagination
                        totalCount={data?.pagination?.total}
                        currentPage={page}
                        pageSize={count}
                        onPageChange={setPage}
                        className="text-base"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex min-h-screen-60 flex-col items-center justify-center">
                  <p className="mx-6 rounded-xl border border-dashed border-slate-200 px-12 py-6 text-center text-lg">
                    {"لا توجد عناصر بعد"}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-screen-60 flex-col items-center justify-center">
              <LuLoader2 className="h-12 w-12 animate-spin text-slate-300" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FormEntryList;
