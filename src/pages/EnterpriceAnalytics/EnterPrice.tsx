
import styled from "styled-components";
import {

  Package,
  FileText,
  BarChart3,
  Building2,
  Users,
  TrendingUp,
  Target,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

/* ---------------------------------------------------------
   Tokens — reusing the app's existing palette so this page
   drops straight into the rest of the Dwarkesh UI.
--------------------------------------------------------- */

const INK = "#14161A";
const BORDER = "#E2E4E9";
const MUTED = "#6B7280";
const FAINT = "#9AA0AC";
const PAGE_BG = "#F6F7F9";
const CHART_COLORS = ["#3B82F6", "#7C3AED", "#C026D3", "#0EA5A5", "#F59E0B"];

/* ---------------------------------------------------------
   Layout shell
--------------------------------------------------------- */
const Page = styled.div`
  min-height: 100vh;
  background: ${PAGE_BG};
  font-family: "gilroy-Medium", "Inter", system-ui, sans-serif;
  color: ${INK};
`;

const Content = styled.main`
  padding: 2rem 1.75rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeading = styled.div`
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: ${INK};
`;

const PageSubtitle = styled.p`
  margin: 0;
  color: ${MUTED};
  font-size: 0.9rem;
`;

/* ---------------------------------------------------------
   Stat cards
--------------------------------------------------------- */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid ${BORDER};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(20, 22, 26, 0.04);
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(20, 22, 26, 0.07);
    transform: translateY(-1px);
  }
`;

const StatTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const StatLabel = styled.div`
  font-size: 0.88rem;
  color: ${MUTED};
  font-weight: 600;
  line-height: 1.3;
`;

const IconBadge = styled.div<{ $bg?: string; $fg?: string }>`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.65rem;
  background: ${(p) => p.$bg || "#EAF6F4"};
  color: ${(p) => p.$fg || "#0EA5A5"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const BigValue = styled.div`
  font-size: 2.1rem;
  font-weight: 800;
  margin-top: 0.9rem;
  color: ${INK};
`;

const TargetRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 0.75rem;
`;

const RingWrap = styled.div`
  position: relative;
  width: 92px;
  height: 92px;
  flex-shrink: 0;
`;

const RingLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 800;
  color: ${INK};
`;

const TargetFigure = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${INK};
`;

const TargetMeta = styled.div`
  font-size: 0.85rem;
  color: ${FAINT};
  margin-top: 0.15rem;
`;

/* ---------------------------------------------------------
   Stock share card
--------------------------------------------------------- */
const ShareCard = styled(Card)`
  &:hover {
    transform: none;
  }
`;

const ShareHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.02rem;
  font-weight: 700;
  color: ${INK};
  margin-bottom: 1.5rem;

  svg {
    width: 1.1rem;
    height: 1.1rem;
    color: ${CHART_COLORS[0]};
  }
`;

const ShareBody = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const DonutWrap = styled.div`
  position: relative;
  width: 190px;
  height: 190px;
`;

const DonutLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DonutCount = styled.div`
  font-size: 1.7rem;
  font-weight: 800;
  color: ${INK};
`;

const DonutCaption = styled.div`
  font-size: 0.75rem;
  color: ${FAINT};
`;

const ModelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
`;

const ModelRow = styled.div``;

const ModelTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.4rem;
  gap: 1rem;
`;

const ModelName = styled.div<{ $dot: string }>`
  font-weight: 700;
  font-size: 0.92rem;
  color: ${INK};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: ${(p) => p.$dot};
    flex-shrink: 0;
  }
`;

const ModelMeta = styled.div`
  font-size: 0.85rem;
  color: ${MUTED};
  white-space: nowrap;
`;

const Track = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #eef0f3;
  overflow: hidden;
`;

const Fill = styled.div<{ $percent: number; $gradient: string }>`
  height: 100%;
  border-radius: 999px;
  width: ${(p) => p.$percent}%;
  background: ${(p) => p.$gradient};
  transition: width 0.6s ease;
`;

/* ---------------------------------------------------------
   Placeholder for the non-analytics tabs
--------------------------------------------------------- */
const Placeholder = styled(Card)`
  text-align: center;
  padding: 3.5rem 1.5rem;
  color: ${MUTED};

  &:hover {
    transform: none;
  }
`;

/* ---------------------------------------------------------
   Data
--------------------------------------------------------- */
const NAV_ITEMS = [
  { key: "stock", label: "Stock Register", icon: Package },
  { key: "challan", label: "Delivery Challan", icon: FileText },
  { key: "analytics", label: "Enterprise Analytics", icon: BarChart3 },
  { key: "godown", label: "Godown Management", icon: Building2 },
  { key: "staff", label: "Staff Management", icon: Users },
];

const STOCK_MODELS = [
  { name: "Honda CB350 H'ness", units: 2 },
  { name: "Honda Dio 110", units: 1 },
  { name: "Honda SP125", units: 1 },
];

const TARGET_AMOUNT = 200000;
const TARGET_ACHIEVED = 144840;

export default function EnterpriseAnalytics() {
  const activeTab = "analytics";

  const totalUnits = STOCK_MODELS.reduce((sum, m) => sum + m.units, 0);
  const modelData = STOCK_MODELS.map((m, i) => ({
    ...m,
    percent: Math.round((m.units / totalUnits) * 100),
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  const targetPercent = Math.round((TARGET_ACHIEVED / TARGET_AMOUNT) * 100);

  return (
    <Page>
      <Content>
        {activeTab === "analytics" ? (
          <>
            <PageHeading>
              <PageTitle>Enterprise Analytics</PageTitle>
              <PageSubtitle>
                Live overview of stock value, sales progress, and model mix
              </PageSubtitle>
            </PageHeading>

            <StatsGrid>
              <Card>
                <StatTop>
                  <StatLabel>Estimated Stock Assets Value</StatLabel>
                  <IconBadge $bg="#E6F7F5" $fg="#0EA5A5">
                    <TrendingUp strokeWidth={2.3} />
                  </IconBadge>
                </StatTop>
                <BigValue>₹0</BigValue>
              </Card>

              <Card>
                <StatTop>
                  <StatLabel>Annual Sales Target (2,00,000+)</StatLabel>
                  <IconBadge $bg="#F3EEFF" $fg="#7C3AED">
                    <Target strokeWidth={2.3} />
                  </IconBadge>
                </StatTop>
                <TargetRow>
                  <RingWrap>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        data={[{ value: targetPercent }]}
                        innerRadius="72%"
                        outerRadius="100%"
                        startAngle={90}
                        endAngle={-270}
                      >
                        <defs>
                          <linearGradient id="targetGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#7C3AED" />
                          </linearGradient>
                        </defs>
                        <PolarAngleAxis
                          type="number"
                          domain={[0, 100]}
                          angleAxisId={0}
                          tick={false}
                        />
                        <RadialBar
                          dataKey="value"
                          cornerRadius={20}
                          fill="url(#targetGrad)"
                          background={{ fill: "#EEF0F3" }}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <RingLabel>{targetPercent}%</RingLabel>
                  </RingWrap>
                  <div>
                    <TargetFigure>{targetPercent}% Met</TargetFigure>
                    <TargetMeta>
                      {TARGET_ACHIEVED.toLocaleString("en-IN")} / {TARGET_AMOUNT.toLocaleString("en-IN")}
                    </TargetMeta>
                  </div>
                </TargetRow>
              </Card>
            </StatsGrid>

            <ShareCard>
              <ShareHeader>
                <BarChart3 strokeWidth={2.3} />
                Stock Share by Model
              </ShareHeader>
              <ShareBody>
                <DonutWrap>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        {modelData.map((m, i) => (
                          <linearGradient key={m.name} id={`pieGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={m.color} stopOpacity={0.75} />
                            <stop offset="100%" stopColor={m.color} />
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        data={modelData}
                        dataKey="units"
                        nameKey="name"
                        innerRadius="68%"
                        outerRadius="100%"
                        paddingAngle={3}
                        stroke="none"
                      >
                        {modelData.map((m, i) => (
                          <Cell key={m.name} fill={`url(#pieGrad${i})`} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <DonutLabel>
                    <DonutCount>{totalUnits}</DonutCount>
                    <DonutCaption>Total Units</DonutCaption>
                  </DonutLabel>
                </DonutWrap>

                <ModelList>
                  {modelData.map((m) => (
                    <ModelRow key={m.name}>
                      <ModelTopRow>
                        <ModelName $dot={m.color}>{m.name}</ModelName>
                        <ModelMeta>
                          {m.units} unit{m.units > 1 ? "s" : ""} ({m.percent}%)
                        </ModelMeta>
                      </ModelTopRow>
                      <Track>
                        <Fill
                          $percent={m.percent}
                          $gradient={`linear-gradient(90deg, ${m.color}99, ${m.color})`}
                        />
                      </Track>
                    </ModelRow>
                  ))}
                </ModelList>
              </ShareBody>
            </ShareCard>
          </>
        ) : (
          <Placeholder>
            {NAV_ITEMS.find((n) => n.key === activeTab)?.label} view goes here.
          </Placeholder>
        )}
      </Content>
    </Page>
  );
}