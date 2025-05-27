"use client";
/* eslint-disable react/no-children-prop */
import { FormMessage } from "@/components/ui/customized.form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/features/storage/form-components/file.uploader.legacy";
import ImageUploader from "@/features/storage/form-components/image.uploader";
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useAppDispatch } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils";
import {
	type Updater,
	useForm,
	type ValidationError,
	type Validator,
} from "@tanstack/react-form";
import { yupValidator } from "@tanstack/yup-form-adapter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/customized.popover";
import { publicRoutes } from "@/config";
import { checkSimilarity } from "@/lib/utilities/strings";
import { LuLoader2, LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { Loader2 } from "lucide-react";
import { faker } from "@faker-js/faker";

const logger = initLogger(LoggerContext.FORM, "InscriptionForm");

import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;
import useCMSContent from "@/hooks/use-cms-content";
type FormDataFields = {
	agency_name_ar: string;
	agency_name_en: string;
	accreditation_number: string;
	onpo_accreditation_number: string;
	email: string;
	phone: string;
	whatsapp: string;
	principle_address: Levelup.CMS.V1.Utils.Entity.Snapshots.Locations.Address;
	departement_addresses: Levelup.CMS.V1.Utils.Entity.Snapshots.Locations.Address[];
	logo: Levelup.CMS.V1.Utils.Common.FileAttribute;
};
export type LoginFormProps = {};

type Props = {};

const DEPARTEMENT_NAMES = [
	"الفرع الأول",
	"الفرع الثاني",
	"الفرع الثالث",
	"الفرع الرابع",
	"الفرع الخامس",
	"الفرع السادس",
	"الفرع السابع",
];

const FORM_KEY = "inscription";

const InscriptionForm: React.FC<Props> = ({}) => {
	/* -------------------------------------------------------------------------- */
	/*                                    TOOLS                                   */
	/* -------------------------------------------------------------------------- */
	const sdk = useSdk();
	const { t: tLabel } = useTranslation("label");
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { getWebsiteConfigValue, getArticleTypeBySlug } = useCMSContent();

	/* -------------------------------------------------------------------------- */
	/*                                    STATE                                   */
	/* -------------------------------------------------------------------------- */

	const states:
		| {
				code: string;
				name: string;
		  }[]
		| undefined = useMemo(
		() => getWebsiteConfigValue("states", []),
		[getWebsiteConfigValue],
	);
	const cities:
		| {
				state_code: string;
				code: string;
				name: string;
		  }[]
		| undefined = useMemo(
		() => getWebsiteConfigValue("cities", []),
		[getWebsiteConfigValue],
	);
	const [wilayaOpen, setWilayaOpen] = useState<boolean[]>(
		Array.from({ length: 20 }).fill(false) as boolean[],
	);
	const [cityOpen, setCityOpen] = useState<boolean[]>(
		Array.from({ length: 20 }).fill(false) as boolean[],
	);
	/* -------------------------------------------------------------------------- */
	/*                                    FORM                                    */
	/* -------------------------------------------------------------------------- */
	const form = useForm<FormDataFields, Validator<unknown, yup.AnySchema>>({
		defaultValues: {
			agency_name_ar: "1222",
			agency_name_en: "3333",
			accreditation_number: "0123",
			onpo_accreditation_number: "0321",
			email: "salmi@gmail.com",
			phone: "06666",
			whatsapp: "07777",
			principle_address: {
				country_code: "dz",
				country_name: "الجزائر",
				state_code: "",
				state_name: "",
				city_code: "",
				city_name: "",
				street_address: "",
			},
			departement_addresses: [
				// {
				// 	country_code: "dz",
				// 	country_name: "الجزائر",
				// 	state_code: "",
				// 	state_name: "",
				// 	city_code: "",
				// 	city_name: "",
				// 	street_address: "",
				// },
			],
			logo: null,
		},

		onSubmit: async ({ value, formApi }) => {
			const payload: ApiAlias.Create.Request<FormDataFields> = {
				data: {
					form: FORM_KEY,
					data: {
						...value,
					},
				},
			};

			try {
				const { data } = await sdk.content.formEntries.create(payload);

				if (data) {
					// router.push(
					//   setPathParams(publicRoutes.homepage._.myAccount.path, { id: data?.user?._id }),
					// );
					logger.success("posted", data);
					toast.success("تم إرسال المعلومات بنجاح، شكرا لتسجيلك");
					toast.info("سيتم إرسال رسالة تأكيد على بريدك الإلكتروني", );
					// setPassportFile(null);
					formApi.reset();
				}
			} catch (error: any) {
				toast.error(error.message, {});
			}
		},
		validatorAdapter: yupValidator(),
	});

	/* -------------------------------------------------------------------------- */
	/*                                   METHODS                                  */
	/* -------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------- */
	/*                                    HOOKS                                   */
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		logger.value('form', form.state)
	}, [form.state])

	/* -------------------------------------------------------------------------- */
	/*                                   RETURN                                   */
	/* -------------------------------------------------------------------------- */
	return (
		<div className="mx-auto max-w-4xl py-6">
			<div className="form rounded-2xl bg-white p-4 shadow-xl shadow-black/5">
				{/* field */}
				<div className="field mb-6">
					<Label className="text-lg text-darkblue-500">
						{"اسم الوكالة بالعربية"}
					</Label>
					<form.Field
						name="agency_name_ar"
						validators={{
							onChange: yup.string().required("اسم الوكالة بالعربية مطلوب"),
						}}
						children={({
							state: { value, meta },
							handleChange,
							handleBlur,
						}) => (
							<>
								<Input
									placeholder="اسم الوكالة بالعربية"
									className="h-auto py-2 text-xl placeholder:text-gray-300 focus-visible:ring-orange-400"
									value={value}
									onChange={event => {
										const _value = event.target.value;
										// Omit latin chars
										handleChange(_value.replace(/[^ء-ي\s0-9]/g, ""));
									}}
								/>
								{meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
							</>
						)}
					/>
				</div>
				{/* field */}
				<div className="field mb-6">
					<Label className="text-lg text-darkblue-500">
						{"اسم الوكالة بالانجليزية"}
					</Label>
					<form.Field
						name="agency_name_en"
						validators={{
							onChange: yup.string().required("اسم الوكالة بالانجليزية مطلوب"),
						}}
						children={({
							state: { value, meta },
							handleChange,
							handleBlur,
						}) => (
							<div dir="ltr">
								<Input
									placeholder="Agency Name in English"
									className="h-auto py-2 text-xl placeholder:text-gray-300 focus-visible:ring-orange-400"
									value={value}
									onChange={event => {
										const _value = event.target.value;
										// Force only latin chars and specials
										handleChange(_value.replace(/[^A-Za-z0-9\s.,'-]/g, ""));
									}}
								/>
								{meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
							</div>
						)}
					/>
				</div>
				{/* field */}
				<div className="field mb-6">
					<Label className="text-lg text-darkblue-500">{"رقم الاعتماد"}</Label>
					<form.Field
						name="accreditation_number"
						validators={{
							onChange: yup.string().required("رقم الاعتماد مطلوب"),
						}}
						children={({
							state: { value, meta },
							handleChange,
							handleBlur,
						}) => (
							<>
								<Input
									type="text"
									placeholder="رقم الاعتماد"
									className="h-auto py-2 text-xl placeholder:text-gray-300 focus-visible:ring-orange-400"
									value={value}
									onChange={event => handleChange(event.target.value)}
								/>
								{meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
							</>
						)}
					/>
				</div>
				{/* field */}
				<div className="field mb-6">
					<Label className="text-lg text-darkblue-500">
						{" رقم الاعتماد ديوان الحج والعمره"}
					</Label>
					<form.Field
						name="onpo_accreditation_number"
						validators={{
							onChange: yup
								.string()
								.required(" رقم الاعتماد ديوان الحج والعمره مطلوب"),
						}}
						children={({
							state: { value, meta },
							handleChange,
							handleBlur,
						}) => (
							<>
								<Input
									type="text"
									placeholder={" رقم الاعتماد ديوان الحج والعمره"}
									className="h-auto py-2 text-xl placeholder:text-gray-300 focus-visible:ring-orange-400"
									value={value}
									onChange={event => handleChange(event.target.value)}
								/>
								{meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
							</>
						)}
					/>
				</div>
				{/* field */}
				<div className="field mb-6">
					<Label className="text-lg text-darkblue-500">{"رقم الهاتف"}</Label>
					<form.Field
						name="phone"
						validators={{
							onChange: yup.string().required("رقم الهاتف مطلوب"),
						}}
						children={({
							state: { value, meta },
							handleChange,
							handleBlur,
						}) => (
							<>
								<Input
									placeholder="رقم الهاتف"
									className="h-auto py-2 text-xl placeholder:text-gray-300 focus-visible:ring-orange-400"
									value={value}
									onChange={event => handleChange(event.target.value)}
								/>
								{meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
							</>
						)}
					/>
				</div>
				{/* field */}
				<div className="field mb-6">
					<Label className="text-lg text-darkblue-500">{"رقم الواتساب"}</Label>
					<form.Field
						name="whatsapp"
						validators={{
							onChange: yup.string().required("رقم الواتساب مطلوب"),
						}}
						children={({
							state: { value, meta },
							handleChange,
							handleBlur,
						}) => (
							<>
								<Input
									placeholder="رقم الواتساب"
									className="h-auto py-2 text-xl placeholder:text-gray-300 focus-visible:ring-orange-400"
									value={value}
									onChange={event => handleChange(event.target.value)}
								/>
								{meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
							</>
						)}
					/>
				</div>

				{/* field */}
				<div className="field mb-6">
					<Label className="text-xl text-darkblue-500">
						{"البريد الالكتروني"}
					</Label>
					<form.Field
						name="email"
						validators={{
							onChange: yup
								.string()
								.email("البريد الالكتروني غير صحيح")
								.required("البريد الالكتروني مطلوب"),
						}}
						children={field => (
							<>
								<Input
									type="email"
									placeholder="البريد الالكتروني"
									className="h-auto py-2 text-xl placeholder:text-gray-300 focus-visible:ring-orange-400"
									value={field.state.value}
									onChange={event => field.handleChange(event.target.value)}
								/>
								{field.state.meta.errors?.[0] && (
									<FormMessage error={field.state.meta.errors?.[0]} />
								)}
							</>
						)}
					/>
				</div>
				{/* field */}
				<form.Field
					name="principle_address"
					validators={{
						onChange: yup.object().shape({
							state_code: yup.string().required("الولاية مطلوبة"),
							city_code: yup.string().required("البلدية مطلوبة"),
						}),
					}}
					children={({ state: { value, meta }, handleChange, handleBlur }) => (
						<>
							<h3 className="mb-3 mt-4 text-xl font-bold text-darkblue-300">
								{"العنوان الرئيسي للوكالة"}
							</h3>
							<div className="field mb-4">
								<Label className="text-lg text-darkblue-500">{"الولاية"}</Label>
								<Popover
									open={wilayaOpen[0]}
									onOpenChange={open =>
										setWilayaOpen(old =>
											old.map((_, index) => (index === 0 ? open : _)),
										)
									}
								>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											aria-expanded={wilayaOpen[0]}
											className="h-auto w-full justify-between rounded-md border-2 py-2 text-xl"
											aria-label="state"
										>
											<div className="value text-xl">
												{!value?.state_code ? (
													<span className="text-darkblue-500">
														{"اختر ولاية..."}
													</span>
												) : (
													<span>
														{states?.find(
															(state: { code: string; name: string }) =>
																state.code === value?.state_code,
														)?.name || ""}
													</span>
												)}
											</div>
											<LuChevronsUpDown className="opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-[320px] p-0 font-tajawal text-2xl sm:w-[436px]"
										align="start"
									>
										<Command
											filter={(value, search, keywords) => {
												const name = states?.find(s => s.code === value)?.name;
												const similarity = checkSimilarity(
													search,
													`${value} ${name}` || "",
												);
												return similarity;
											}}
										>
											<CommandInput
												className="text-xl"
												placeholder="ابحث هنا..."
											/>
											<CommandList>
												<CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
													لا توجد خيارات.
												</CommandEmpty>
												<CommandGroup>
													{states?.map(item => (
														<CommandItem
															key={item.code}
															value={item.code}
															onSelect={value => {
																handleChange(old => ({
																	...old,
																	state_code: value || "",
																	state_name:
																		states?.find(index => index.code === value)
																			?.name || "",
																	city_code: "",
																}));
																setWilayaOpen(old =>
																	old.map((_, index) =>
																		index === 0 ? false : _,
																	),
																);
															}}
															className="text-xl"
														>
															<span className="inline-block text-darkblue-400">
																{item.code}
															</span>
															{item.name}
															<LuCheck
																className={cn(
																	"ms-auto",
																	item.code === value?.state_code
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
							{/* field */}
							<div className="field mb-4">
								<Label className="text-lg text-darkblue-500">{"البلدية"}</Label>
								<Popover
									open={cityOpen[0]}
									onOpenChange={open =>
										setCityOpen(old =>
											old.map((_, index) => (index === 0 ? open : _)),
										)
									}
								>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											aria-expanded={cityOpen[0]}
											className="h-auto w-full justify-between rounded-md border-2 py-2 text-xl"
											aria-label="city"
										>
											<div className="value h-auto text-xl">
												{!value?.city_code ? (
													<span className="text-darkblue-500">
														{"اختر بلدية..."}
													</span>
												) : (
													<span>
														{cities?.find(
															index => index.code === value?.city_code,
														)?.name || ""}
													</span>
												)}
											</div>
											<LuChevronsUpDown className="opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-[320px] p-0 font-tajawal text-2xl sm:w-[436px]"
										align="start"
									>
										<Command
											filter={(value, search, keywords) => {
												const name = cities?.find(s => s.code === value)?.name;
												const similarity = checkSimilarity(search, name || "");
												return similarity;
											}}
										>
											<CommandInput
												className="text-xl"
												placeholder="ابحث هنا..."
											/>
											<CommandList>
												<CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
													لا توجد خيارات.
												</CommandEmpty>
												<CommandGroup>
													{cities
														?.filter(
															item => item.state_code === value.state_code,
														)
														.map(item => (
															<CommandItem
																key={item.code}
																value={item.code}
																onSelect={value => {
																	handleChange(old => ({
																		...old,
																		city_code: value || "",
																		city_name:
																			cities?.find(
																				index => index.code === value,
																			)?.name || "",
																	}));
																	setCityOpen(old =>
																		old.map((_, index) =>
																			index === 0 ? false : _,
																		),
																	);
																}}
																className="text-xl"
															>
																{item.name}
																<LuCheck
																	className={cn(
																		"ms-auto",
																		item.code === value.city_code
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
															</CommandItem>
														))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							{/* field */}
							<div className="field mb-4">
								<Label className="text-lg text-darkblue-500">{"الشارع"}</Label>
								<Textarea
									className="h-auto py-2 text-xl focus-visible:ring-orange-400"
									value={value.street_address}
									onChange={event =>
										handleChange(old => ({
											...old,
											street_address: event.target.value,
										}))
									}
								/>
							</div>
							{meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
						</>
					)}
				/>
				<Separator className="my-6" />
				<h2 className="mb-4 text-2xl font-bold text-darkblue-500">
					{"عناوين الفروع"}
				</h2>
				<div className="grid grid-cols-1 gap-6">
					<form.Field
						name="departement_addresses"
						mode="array"
						validators={{
							
						}}
					>
						{field => (
							<div>
								{field.state.value.map((_, index_) => (
									<form.Field
										name={
											`departement_addresses[${index_}]` as keyof FormDataFields
										}
										key={index_}
										validators={{
											onChange: yup.object().shape({
												state_code: yup.string().required("الولاية مطلوبة"),
												city_code: yup.string().required("البلدية مطلوبة"),
												street_address: yup.string().optional(),
											}),
										}}
									>
										{subField => {
											const index = index_ + 1;
											const {
												state: { value, meta },
												handleChange,
												handleBlur,
											}: {
												state: {
													value: Levelup.CMS.V1.Utils.Entity.Snapshots.Locations.Address;
													meta: {
														errors: ValidationError[];
														touched: boolean;
													};
												};
												handleChange: (
													updater: Updater<Levelup.CMS.V1.Utils.Entity.Snapshots.Locations.Address>,
												) => void;
												handleBlur: () => void;
											} = subField as any;
											return (
												<div>
													<h3 className="mb-4 text-xl font-bold text-darkblue-300">
														{DEPARTEMENT_NAMES[index_]}
													</h3>

													<div className="mb-6 border-b pb-6">
														<div className="field mb-4">
															<Label className="text-lg text-darkblue-500">
																{"الولاية"}
															</Label>
															<Popover
																open={wilayaOpen[index]}
																onOpenChange={open =>
																	setWilayaOpen(old => {
																		const newState = [...old];
																		newState[index] = open;
																		return newState;
																	})
																}
															>
																<PopoverTrigger asChild>
																	<Button
																		variant="outline"
																		role="combobox"
																		aria-expanded={wilayaOpen[index]}
																		className="h-auto w-full justify-between rounded-md border-2 py-2 text-xl"
																		aria-label="state"
																	>
																		<div className="value text-xl">
																			{!value?.state_code ? (
																				<span className="text-darkblue-500">
																					{"اختر ولاية..."}
																				</span>
																			) : (
																				<span>
																					{states?.find(
																						(state: {
																							code: string;
																							name: string;
																						}) =>
																							state.code === value?.state_code,
																					)?.name || ""}
																				</span>
																			)}
																		</div>
																		<LuChevronsUpDown className="opacity-50" />
																	</Button>
																</PopoverTrigger>
																<PopoverContent
																	className="w-[320px] p-0 font-tajawal text-2xl sm:w-[436px]"
																	align="start"
																>
																	<Command
																		filter={(value, search, keywords) => {
																			const name = states?.find(
																				s => s.code === value,
																			)?.name;
																			const similarity = checkSimilarity(
																				search,
																				`${value} ${name}` || "",
																			);
																			return similarity;
																		}}
																	>
																		<CommandInput
																			className="text-xl"
																			placeholder="ابحث هنا..."
																		/>
																		<CommandList>
																			<CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
																				لا توجد خيارات.
																			</CommandEmpty>
																			<CommandGroup>
																				{states?.map(item => (
																					<CommandItem
																						key={item.code}
																						value={item.code}
																						onSelect={value => {
																							handleChange(old => ({
																								...old,
																								state_code: value || "",
																								state_name:
																									states?.find(
																										index =>
																											index.code === value,
																									)?.name || "",
																								city_code: "",
																								city_name: "",
																							}));
																							setWilayaOpen(old => {
																								const newState = [...old];
																								newState[index] = false;
																								return newState;
																							});
																						}}
																						className="text-xl"
																					>
																						<span className="inline-block text-darkblue-400">
																							{item.code}
																						</span>
																						{item.name}
																						<LuCheck
																							className={cn(
																								"ms-auto",
																								item.code === value?.state_code
																									? "opacity-100"
																									: "opacity-0",
																							)}
																						/>
																					</CommandItem>
																				))}
																			</CommandGroup>
																		</CommandList>
																	</Command>
																</PopoverContent>
															</Popover>
														</div>
														<div className="field mb-4">
															<Label className="text-lg text-darkblue-500">
																{"البلدية"}
															</Label>
															<Popover
																open={cityOpen[index]}
																onOpenChange={open =>
																	setCityOpen(old => {
																		const newState = [...old];
																		newState[index] = open;
																		return newState;
																	})
																}
															>
																<PopoverTrigger asChild>
																	<Button
																		variant="outline"
																		role="combobox"
																		aria-expanded={cityOpen[index]}
																		className="h-auto w-full justify-between rounded-md border-2 py-2 text-xl"
																		aria-label="city"
																	>
																		<div className="value h-auto text-xl">
																			{!value?.city_code ? (
																				<span className="text-darkblue-500">
																					{"اختر بلدية..."}
																				</span>
																			) : (
																				<span>
																					{cities?.find(
																						index =>
																							index.code === value?.city_code,
																					)?.name || ""}
																				</span>
																			)}
																		</div>
																		<LuChevronsUpDown className="opacity-50" />
																	</Button>
																</PopoverTrigger>
																<PopoverContent
																	className="w-[320px] p-0 font-tajawal text-2xl sm:w-[436px]"
																	align="start"
																>
																	<Command
																		filter={(value, search, keywords) => {
																			const name = cities?.find(
																				s => s.code === value,
																			)?.name;
																			const similarity = checkSimilarity(
																				search,
																				name || "",
																			);
																			return similarity;
																		}}
																	>
																		<CommandInput
																			className="text-xl"
																			placeholder="ابحث هنا..."
																		/>
																		<CommandList>
																			<CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
																				لا توجد خيارات.
																			</CommandEmpty>
																			<CommandGroup>
																				{cities
																					?.filter(
																						item =>
																							item.state_code ===
																							value.state_code,
																					)
																					.map(item => (
																						<CommandItem
																							key={item.code}
																							value={item.code}
																							onSelect={value => {
																								handleChange(old => ({
																									...old,
																									city_code: value || "",
																									city_name:
																										cities?.find(
																											index =>
																												index.code === value,
																										)?.name || "",
																								}));
																								setCityOpen(old => {
																									const newState = [...old];
																									newState[index] = false;
																									return newState;
																								});
																							}}
																							className="text-xl"
																						>
																							{item.name}
																							<LuCheck
																								className={cn(
																									"ms-auto",
																									item.code === value.city_code
																										? "opacity-100"
																										: "opacity-0",
																								)}
																							/>
																						</CommandItem>
																					))}
																			</CommandGroup>
																		</CommandList>
																	</Command>
																</PopoverContent>
															</Popover>
														</div>
														<div className="field mb-4">
															<Label className="text-lg text-darkblue-500">
																{"الشارع"}
															</Label>
															<Textarea
																className="h-auto py-2 text-xl focus-visible:ring-orange-400"
																value={value.street_address}
																onChange={event =>
																	handleChange(old => ({
																		...old,
																		street_address: event.target.value,
																	}))
																}
															/>
														</div>
														{meta.errors?.[0] && (
															<FormMessage error={meta.errors?.[0]} />
														)}
														{field.state.value.length > 1 && (
															<div className="flex justify-end">
																<Button
																	variant="destructive"
																	onClick={() => {
																		field.removeValue(index);
																		setWilayaOpen(old =>
																			old.filter(
																				(_, index__) => index__ !== index,
																			),
																		);
																		setCityOpen(old =>
																			old.filter(
																				(_, index__) => index__ !== index,
																			),
																		);
																	}}
																	className="mt-2"
																>
																	إزالة الفرع
																</Button>
															</div>
														)}
													</div>
												</div>
											);
										}}
									</form.Field>
								))}
								<div className="flex justify-end">
									<Button
										onClick={() => {
											field.pushValue({
												country_code: "dz",
												country_name: "الجزائر",
												state_code: "",
												state_name: "",
												city_code: "",
												city_name: "",
												street_address: "",
											});
											form.validateAllFields('change');
											setWilayaOpen(old => [...old, false]);
											setCityOpen(old => [...old, false]);
										}}
										type="button"
										className="mt-4"
									>
										أضف فرعًا جديدًا
									</Button>
								</div>
							</div>
						)}
					</form.Field>
				</div>
				<Separator className="my-6" />
				{/* field */}
				{/* <div className="field mb-6">
        <Label className="text-lg text-darkblue-500">{"الوصف"}</Label>
        <form.Field
          name="description"
          validators={{}}
          children={({ state: { value, meta }, handleChange, handleBlur }) => (
            <>
              <Textarea
                rows={6}
                placeholder="الوصف"
                className="h-auto py-2 text-xl focus-visible:ring-orange-400 placeholder:text-gray-300"
                value={value}
                onChange={event => handleChange(event.target.value)}
              />
              {meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
              )}
            </>
          )}
        />
      </div> */}
				{/* field */}
				<div className="field mb-6">
					<Label className="text-lg text-darkblue-500">{"اللوغو"}</Label>
					<div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<form.Field
							name="logo"
							validators={{}}
							children={({
								state: { value, meta },
								handleChange,
								handleBlur,
							}) => (
								<div>
									<ImageUploader
										value={value}
										onUpload={file => {
											logger.value("File uploaded", file);
											handleChange({
												id: file._id,
												url: sdk.storage.utils.getFileUrl(file._id),
											});
										}}
										onRemove={() => {
											logger.value("File removed");
											handleChange(null);
										}}
										imageRatio={1}
										containerClassname="w-80 max-w-full aspect-square rounded-lg overflow-hidden"
										dimensions={{
											width: 400,
											height: 400,
										}}
										placeholder={
											<div className="flex w-full justify-center text-center">
												<Image
													src="/cms/assets/svg/upload-image.svg"
													width={100}
													height={100}
													alt="upload"
												/>
											</div>
										}
									/>
									{meta.errors?.[0] && <FormMessage error={meta.errors?.[0]} />}
								</div>
							)}
						/>
					</div>
				</div>
				<div className="flex justify-center py-10">
					<form.Subscribe
						selector={state => [
							state.canSubmit,
							state.isSubmitting,
							state.errors,
						]}
						children={([canSubmit, isSubmitting, errors]) => (
							<>
								<div className="grid grid-cols-1 gap-4">
									{(errors as ValidationError[])?.map((error, index) => (
										<FormMessage key={index} error={error as string} />
									))}
								</div>
								<button
									className="inline-flex gap-4 rounded-xl bg-darkblue-700 px-10 py-2 pb-3 pt-4 text-xl font-bold text-white transition-all disabled:opacity-50 hocus:bg-darkblue-900"
									type="submit"
									disabled={
										(isSubmitting as boolean) || !(canSubmit as boolean)
									}
									aria-label="submit"
									onClick={form.handleSubmit}
								>
									{isSubmitting && <LuLoader2 className="animate-spin" />}
									{isSubmitting ? "جار الارسال" : "أرسل"}
								</button>
							</>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default InscriptionForm;
