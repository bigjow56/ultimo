import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from "../hooks/use-toast";
import { insertSurveySchema, type InsertSurvey } from "../../../shared/schema";
import { surveyApi } from "../lib/api";
import { CheckCircle, Heart } from "lucide-react";
import rmGymLogo from "../assets/rm-gym-logo.jpg";

export function SurveyForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertSurvey>({
    resolver: zodResolver(insertSurveySchema),
    defaultValues: {
      name: "",
      email: "",
      trainingSchedule: undefined,
      experienceLevel: undefined,
      academyTime: undefined,
      receptionService: undefined,
      instructorSupport: undefined,
      trainingGuidance: undefined,
      equipmentAvailability: undefined,
      overallSatisfaction: undefined,
      suggestions: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: surveyApi.submit,
    onSuccess: () => {
      console.log('✅ Pesquisa enviada com sucesso!');
      setIsSubmitted(true);
      toast({
        title: "Pesquisa enviada com sucesso!",
        description: "Obrigado pelo seu feedback. Ele é muito importante para nós.",
        variant: "default",
      });
    },
    onError: (error: any) => {
      console.error('❌ Erro detalhado ao enviar pesquisa:', error);
      console.error('❌ Stack trace:', error.stack);
      console.error('❌ Tipo do erro:', typeof error);
      
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      
      // Tratar diferentes tipos de erro
      if (error.message) {
        if (error.message.includes('404')) {
          errorMessage = "Serviço não encontrado. Verifique se o site foi publicado corretamente no Netlify.";
        } else if (error.message.includes('500')) {
          errorMessage = "Erro interno do servidor. Tente novamente em alguns minutos.";
        } else if (error.message.includes('400')) {
          errorMessage = "Dados inválidos. Verifique se todos os campos obrigatórios foram preenchidos.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Erro ao enviar pesquisa",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSurvey) => {
    console.log("🚀 Iniciando envio da pesquisa");
    console.log("📝 Dados a serem enviados:", data);
    console.log("🔍 Erros do formulário:", form.formState.errors);
    console.log("🌍 URL atual:", window.location.href);
    console.log("🔧 Hostname:", window.location.hostname);
    
    // Verificar se todos os campos obrigatórios estão preenchidos
    const requiredFields: (keyof InsertSurvey)[] = ['trainingSchedule', 'experienceLevel', 'academyTime', 'receptionService', 'instructorSupport', 'trainingGuidance', 'equipmentAvailability', 'overallSatisfaction'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error("❌ Campos obrigatórios não preenchidos:", missingFields);
      toast({
        title: "Campos obrigatórios não preenchidos",
        description: `Por favor, preencha: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }
    
    console.log("✅ Todos os campos obrigatórios preenchidos, enviando...");
    submitMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="survey-header-gradient text-white py-16 md:py-24">
          <div className="container mx-auto text-center px-4">
            <div className="flex justify-center mb-8">
              <img 
                src={rmGymLogo} 
                alt="RM GYM Logo" 
                className="w-28 h-28 md:w-32 md:h-32 rounded-full shadow-lg object-cover border-3 border-white/20"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">RM GYM</h1>
            <p className="text-lg md:text-xl opacity-90 font-medium tracking-wide">HIGH PERFORMANCE</p>
          </div>
        </div>
        
        <div className="container mx-auto py-12 px-4">
          <Card className="max-w-2xl mx-auto text-center survey-card">
            <CardContent className="pt-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Pesquisa Enviada!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Obrigado por dedicar seu tempo para nos ajudar a melhorar. 
                Seu feedback é fundamental para oferecer uma experiência ainda melhor na RM GYM.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                variant="outline"
              >
                Enviar Nova Pesquisa
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="survey-header-gradient text-white py-16 md:py-24">
        <div className="container mx-auto text-center px-4">
          {/* Logo e informações principais */}
          <div className="mb-12 md:mb-16">
            <div className="flex justify-center mb-8">
              <img 
                src={rmGymLogo} 
                alt="RM GYM Logo" 
                className="w-28 h-28 md:w-32 md:h-32 rounded-full shadow-lg object-cover border-3 border-white/20"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">RM GYM</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 md:mb-12 font-medium tracking-wide">HIGH PERFORMANCE</p>
          </div>
          
          {/* Seção principal de pesquisa */}
          <div className="mb-12 md:mb-16">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
              <Heart className="w-16 h-16 md:w-20 md:h-20 text-white/90 flex-shrink-0" />
              <div className="text-center md:text-left max-w-2xl">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                  Sua Opinião é Muito Importante!
                </h2>
                <p className="text-base md:text-lg leading-relaxed" style={{color: '#E8F5E8'}}>
                  Ajude-nos a melhorar os seus treinos! Sua avaliação nos permite oferecer
                  sempre o melhor atendimento e experiência na RM GYM.
                </p>
              </div>
            </div>
          </div>
          
          {/* Indicadores informativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-2xl md:text-xl">✓</span>
              <span className="text-sm md:text-base font-medium">100% Anônimo</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-2xl md:text-xl">⏱</span>
              <span className="text-sm md:text-base font-medium">2 minutos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Informações Pessoais */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">👤</span>
                    Informações Pessoais
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full ml-2">OPCIONAL</span>
                  </CardTitle>
                  <CardDescription className="survey-description">
                    <strong>Campos opcionais</strong> - você pode deixar em branco se preferir manter o anonimato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="survey-form-label">
                            Nome completo 
                            <span className="text-xs text-gray-500 ml-1">(opcional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Deixe em branco se preferir" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="survey-form-label">
                            E-mail 
                            <span className="text-xs text-gray-500 ml-1">(opcional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Deixe em branco se preferir" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-3 text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-medium">💡 Dica:</span> Estes campos são completamente opcionais. Você pode preencher apenas as perguntas obrigatórias abaixo.
                  </div>
                </CardContent>
              </Card>

              {/* 1. Horário de Treino */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                    Horário de Treino
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Qual o horário que você costuma treinar?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="trainingSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="manha" id="manha" />
                              <label htmlFor="manha" className="cursor-pointer flex items-center survey-label">
                                <span className="text-green-500 mr-2">🌅</span>
                                Manhã
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="tarde" id="tarde" />
                              <label htmlFor="tarde" className="cursor-pointer flex items-center survey-label">
                                <span className="text-yellow-500 mr-2">☀️</span>
                                Tarde
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="noite" id="noite" />
                              <label htmlFor="noite" className="cursor-pointer flex items-center survey-label">
                                <span className="text-purple-500 mr-2">🌙</span>
                                Noite
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="varia-conforme-dia" id="varia" />
                              <label htmlFor="varia" className="cursor-pointer flex items-center survey-label">
                                <span className="text-gray-500 mr-2">🔀</span>
                                Varia conforme o dia
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 2. Nível de Experiência */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                    Nível de Experiência
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Você se considera:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="iniciante" id="iniciante" />
                              <label htmlFor="iniciante" className="cursor-pointer flex items-center survey-label">
                                <span className="text-green-500 mr-2">🔰</span>
                                Iniciante
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="intermediario" id="intermediario" />
                              <label htmlFor="intermediario" className="cursor-pointer flex items-center survey-label">
                                <span className="text-blue-500 mr-2">💪</span>
                                Intermediário
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="avancado" id="avancado" />
                              <label htmlFor="avancado" className="cursor-pointer flex items-center survey-label">
                                <span className="text-purple-500 mr-2">⚡</span>
                                Avançado
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 3. Tempo de Academia */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
                    Tempo de Academia
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Há quanto tempo você treina na academia?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="academyTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="menos-1-mes" id="menos1mes" />
                              <label htmlFor="menos1mes" className="cursor-pointer survey-label">
                                Menos de 1 mês
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1-6-meses" id="1-6meses" />
                              <label htmlFor="1-6meses" className="cursor-pointer survey-label">
                                1 à 6 meses
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="6-meses-1-ano" id="6meses-1ano" />
                              <label htmlFor="6meses-1ano" className="cursor-pointer survey-label">
                                6 meses à 1 ano
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mais-1-ano" id="mais1ano" />
                              <label htmlFor="mais1ano" className="cursor-pointer survey-label">
                                Mais de 1 ano
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 4. Recepção e Atendimento Inicial */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
                    Recepção e Atendimento Inicial
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Como você avalia o atendimento da recepção ao entrar na academia?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="receptionService"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="excelente" id="excelente" />
                              <label htmlFor="excelente" className="cursor-pointer flex items-center survey-label">
                                <span className="text-green-500 mr-2">⭐</span>
                                Excelente
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="bom" id="bom" />
                              <label htmlFor="bom" className="cursor-pointer flex items-center survey-label">
                                <span className="text-blue-500 mr-2">😊</span>
                                Bom
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="regular" id="regular" />
                              <label htmlFor="regular" className="cursor-pointer flex items-center survey-label">
                                <span className="text-yellow-500 mr-2">😐</span>
                                Regular
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ruim" id="ruim" />
                              <label htmlFor="ruim" className="cursor-pointer flex items-center survey-label">
                                <span className="text-red-500 mr-2">❌</span>
                                Ruim
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 5. Acompanhamento dos Instrutores */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">5</span>
                    Acompanhamento dos Instrutores
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Os instrutores acompanham seu treino de forma adequada e atenciosa?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="instructorSupport"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sempre" id="sempre" />
                              <label htmlFor="sempre" className="cursor-pointer survey-label">
                                Sempre
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="as-vezes" id="asvezes" />
                              <label htmlFor="asvezes" className="cursor-pointer survey-label">
                                Às vezes
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="raramente" id="raramente" />
                              <label htmlFor="raramente" className="cursor-pointer survey-label">
                                Raramente
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="nunca" id="nunca" />
                              <label htmlFor="nunca" className="cursor-pointer survey-label">
                                Nunca
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 6. Orientação e Personalização do Treino */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">6</span>
                    Orientação e Personalização do Treino
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Você sente que recebe orientação adequada sobre os exercícios e que ela é personalizada de acordo com seus objetivos?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="trainingGuidance"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sim-sempre" id="sim-sempre" />
                              <label htmlFor="sim-sempre" className="cursor-pointer survey-label">
                                Sim, sempre
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="as-vezes" id="treino-asvezes" />
                              <label htmlFor="treino-asvezes" className="cursor-pointer survey-label">
                                Às vezes
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="recebo-orientacao-nao-personalizada" id="nao-personalizada" />
                              <label htmlFor="nao-personalizada" className="cursor-pointer survey-label">
                                Recebo orientação, mas não é personalizada
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="nao-recebo-orientacao" id="nao-recebo" />
                              <label htmlFor="nao-recebo" className="cursor-pointer survey-label">
                                Não recebo orientação
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 7. Disponibilidade de Equipamentos */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">7</span>
                    Disponibilidade de Equipamentos
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Os equipamentos estão em boas condições e disponíveis nos horários em que você treina?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="equipmentAvailability"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sempre" id="equip-sempre" />
                              <label htmlFor="equip-sempre" className="cursor-pointer survey-label">
                                Sempre
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="as-vezes" id="equip-asvezes" />
                              <label htmlFor="equip-asvezes" className="cursor-pointer survey-label">
                                Às vezes
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="frequentemente-ocupados-defeito" id="ocupados-defeito" />
                              <label htmlFor="ocupados-defeito" className="cursor-pointer survey-label">
                                Frequentemente ocupados ou com defeito
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 8. Satisfação Geral */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">8</span>
                    Satisfação Geral
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Qual o seu nível de satisfação geral com a academia?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="overallSatisfaction"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="muito-satisfeito" id="muito-satisfeito" />
                              <label htmlFor="muito-satisfeito" className="cursor-pointer flex items-center survey-label">
                                <span className="text-green-500 mr-2">❤️</span>
                                Muito satisfeito
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="satisfeito" id="satisfeito" />
                              <label htmlFor="satisfeito" className="cursor-pointer flex items-center survey-label">
                                <span className="text-blue-500 mr-2">😊</span>
                                Satisfeito
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="indiferente" id="indiferente" />
                              <label htmlFor="indiferente" className="cursor-pointer flex items-center survey-label">
                                <span className="text-yellow-500 mr-2">😐</span>
                                Indiferente
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="insatisfeito" id="insatisfeito" />
                              <label htmlFor="insatisfeito" className="cursor-pointer flex items-center survey-label">
                                <span className="text-red-500 mr-2">😞</span>
                                Insatisfeito
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Comentários Adicionais */}
              <Card className="survey-card">
                <CardHeader>
                  <CardTitle className="flex items-center survey-title">
                    <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">📝</span>
                    Comentários Adicionais
                  </CardTitle>
                  <CardDescription className="survey-description">
                    Tem alguma sugestão ou comentário? Sua opinião é muito valiosa!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="suggestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Compartilhe suas sugestões, elogios ou qualquer feedback que nos ajude a melhorar..."
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Card className="survey-card">
                <CardContent className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg"
                    disabled={submitMutation.isPending}
                  >
                    <span className="mr-2">📋</span>
                    {submitMutation.isPending ? "Enviando..." : "Enviar Pesquisa"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center">
                    <span className="mr-1">🔒</span>
                    Suas respostas são confidenciais e nos ajudam a melhorar nossos serviços
                  </p>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={rmGymLogo} 
              alt="RM GYM Logo" 
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">RM GYM</h3>
          <p className="text-gray-400 text-sm">HIGH PERFORMANCE</p>
          <div className="flex justify-center items-center gap-6 mt-6 text-sm text-gray-400">
            <div className="flex items-center">
              <span className="mr-2">🛡️</span>
              Dados Seguros
            </div>
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              Privacidade Garantida
            </div>
            <div className="flex items-center">
              <span className="mr-2">💖</span>
              Melhoria Contínua
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © 2024 RM GYM. Obrigado por fazer parte da nossa comunidade!
          </p>
        </div>
      </div>
    </div>
  );
}