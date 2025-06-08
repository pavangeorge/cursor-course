'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Star, GitPullRequest, TrendingUp, BarChart3, Zap, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Github className="h-6 w-6 mr-2" />
          <span className="font-bold text-xl">szilly</span>
        </Link>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features">
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing">
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#about">
            About
          </Link>
          {session && (
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/dashboards">
              Dashboards
            </Link>
          )}
        </nav>
        <button className="md:hidden p-2" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2 ml-4">
          {session ? (
            <div className="flex items-center gap-4">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt="Profile picture"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-medium">{session.user.name}</span>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => signIn('google')}>
                Login
              </Button>
              <Button size="sm" onClick={() => signIn('google')}>Sign Up</Button>
            </>
          )}
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered GitHub Analysis
                </Badge>
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Unlock Deep Insights from
                  <span className="text-primary"> GitHub Repositories</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get comprehensive analysis, trending metrics, and actionable insights from any open source GitHub
                  repository. Track stars, pull requests, releases, and discover hidden gems in the codebase.
                </p>
              </div>
              <div className="space-x-4">
                <Button 
                  size="lg" 
                  className="h-12 px-8"
                  onClick={() => session ? window.location.href = '/dashboards' : signIn('google')}
                >
                  {session ? 'Go to Dashboard' : 'Start Analyzing'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8">
                  View Demo
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  Free tier available
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  No credit card required
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Powerful Repository Analysis</h2>
                <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl">
                  Everything you need to understand and track GitHub repositories at scale
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-primary" />
                  <CardTitle>Smart Summaries</CardTitle>
                  <CardDescription>
                    AI-generated summaries that capture the essence of any repository, including purpose, tech stack,
                    and key features.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Star className="h-10 w-10 text-primary" />
                  <CardTitle>Star Analytics</CardTitle>
                  <CardDescription>
                    Track star growth over time, identify trending periods, and understand what drives repository
                    popularity.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary" />
                  <CardTitle>Cool Facts Discovery</CardTitle>
                  <CardDescription>
                    Uncover interesting statistics, contributor insights, and unique patterns that make each repository
                    special.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <GitPullRequest className="h-10 w-10 text-primary" />
                  <CardTitle>PR Intelligence</CardTitle>
                  <CardDescription>
                    Stay updated with the most important pull requests, their impact, and contribution patterns.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Badge className="h-10 w-10 text-primary flex items-center justify-center">v2.0</Badge>
                  <CardTitle>Version Tracking</CardTitle>
                  <CardDescription>
                    Monitor releases, changelog analysis, and version update patterns to stay current with project
                    evolution.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary" />
                  <CardTitle>Real-time Insights</CardTitle>
                  <CardDescription>
                    Get instant notifications and updates when important changes happen in your tracked repositories.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl">
                  Start free and scale as you grow. No hidden fees, no surprises.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 max-w-5xl mx-auto mt-12">
              {/* Free Tier */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                  <div className="text-4xl font-bold">$0</div>
                  <div className="text-sm text-muted-foreground">Forever free</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">5 repository analyses per month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Basic summaries and stats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Star tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Community support</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Get Started Free
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card className="relative border-primary">
              <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">Coming Soon</Badge>
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
                <CardHeader>
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <CardDescription>For serious developers and teams</CardDescription>
                  <div className="text-4xl font-bold">$19</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">100 repository analyses per month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Advanced AI insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">PR analysis and tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Version update notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">API access</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>               
                </CardFooter>
              </Card>

              {/* Enterprise Tier */}
              <Card className="relative">
              <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">Coming Soon</Badge>
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="text-4xl font-bold">Custom</div>
                  <div className="text-sm text-muted-foreground">Contact us</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Unlimited analyses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom integrations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dedicated support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">On-premise deployment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">SLA guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom features</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" disabled>
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div
              className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Analyze Your First Repository?
                </h2>
                <p
                  className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers who trust szilly to understand their GitHub repositories better.
                </p>
              </div>
              <div className="space-x-4">
                <Button 
                  size="lg" 
                  className="h-12 px-8"
                  onClick={() => session ? window.location.href = '/dashboards' : signIn('google')}
                >
                  {session ? 'Go to Dashboard' : 'Start Free Analysis'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 szilly Github Analyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
