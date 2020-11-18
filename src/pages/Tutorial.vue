<template>
  <q-page>
    <!-- RealGraph 소개 -->
    <div class="markdown">
      <h4 class="maintitle">RealGraph</h4>
      <h6 class="subtitle">Conference name</h6>
      <p class="content">The World Wide Web Conference 2019</p>

      <h6 class="subtitle">Paper title</h6>
      <p class="content">RealGraph: A Graph Engine Leveraging the Power-Law Distribution of Real-World Graphs</p>

      <h6 class="subtitle">Abstract</h6>
      <p class="content">
        As the size of real-world graphs has drastically increased in recent years, a wide variety of graph engines have been developed to deal with such big graphs efficiently. However, the majority of graph engines have been designed without considering the power-law degree distribution of real-world graphs seriously. Two problems have been observed when existing graph engines process real-world graphs: inefficient scanning of the sparse indicator and the delay in iteration progress due to uneven workload distribution. In this paper, we propose RealGraph, a single-machine based graph engine equipped with the hierarchical indicator and the block-based workload allocation. Experimental results on real-world datasets show that RealGraph significantly outperforms existing graph engines in terms of both speed and scalability.
      </p>
    </div>

    <div class="tutorial q-mb-lg">
      <img src="~/assets/RealGraphPerformance.png" alt="performance" style="width: 90%;">
    </div>

    <hr>
    <!-- RealGraph web 소개 -->
    <div class="markdown">
      <h4 class="maintitle">RealGraph<sup>Web</sup></h4>
      <p class="content">
        RealGraph<sup>Web</sup> is a web-based graph analysis service using <a href="http://realgraph.hanyang.ac.kr:20080/">RealGraph</a>.
        <br>
        The tutorial guide below would be useful to get the overall concept of RealGraph<sup>Web</sup>.
      </p>
      <p class="content">
        RealGraph<sup>Web</sup> is a web-based platform that provides an interactive web-based interface, allowing users to access various graph analysis services by performing graph algorithms easily and conveniently anywhere on the web.
        <br>
      </p>
      <p class="content">
        Graph analysis services using RealGraph<sup>Web</sup> are performed in three steps:
        <br>
        1) <strong>graph upload</strong>, 2) <strong>algorithm execution</strong>, and 3) <strong>result visualization & download steps</strong> (Fig. 1).
        <br>
        In this section, we present how a user could analyze a graph on RealGraph<sup>Web</sup> by these three steps.
      </p>
    </div>

    <div class="tutorial q-my-lg">
      <img src="~/assets/DemoDraft.png" alt="demo draft" style="height: 90%">
    </div>

    <!-- Steps -->
    <div class="markdown">
      <h6 class="subtitle">1) Graph upload</h6>
      <p class="content">
        A user uploads her target graph to RealGraph<sup>Web</sup> in a server via a network in a graph upload step. RealGraph<sup>Web</sup> provides the user with the format and a sample of an input graph data. This allows the user to upload her graph to be analyzed to the server in the correct format. Then, it converts the received graph to its own structure and stores it in the storage.
      </p>

      <h6 class="subtitle">2) Algorithm execution</h6>
      <p class="content">
        Fig. 1-(a)$\sim$(d) show the substeps of an algorithm execution step. The server provides a list of graphs already stored in RealGraph<sup>Web</sup>, among which a user selects her target for analysis (Fig. 1-(a)). The user sees the characteristics of the graph, such as numbers of nodes and edges, density, file size, etc. The server provides various graph algorithms commonly implemented in many graph engines, such as Outdegree/Indegree distribution, breadth first search (BFS), PageRank, and weakly connected component (WCC).
It also provides various additional graph algorithms, such as betweenness centrality (BC), hypertext induced topic selection (HITS), single source shortest path (SSSP), and random walk with restart (RWR).
and community detection (CD), among which a user selects one for her analysis (Fig. 1-(b)). Each algorithm has its own parameters: for instance, BFS requires the starting node while PageRank does the number of iterations. A user sets parameters as the values she wants (Fig. 1-(c)). Then, she requests the execution of the algorithm on the graph (Fig. 1-(d)).
She can recognize the effect of the techniques uniquely employed in RealGraph by selecting the options of whether it runs with or without each technique.
The server stores the result and the elapsed time of algorithm execution in a binary file after the execution is completed.
      </p>

      <h6 class="subtitle">3) Result visualization & download</h6>
      <p class="content">
        The server provides visualization and download functions in a result visualization & download step. It visualizes the execution result in a binary file in terms of a table, a chart, or a graph by using the libraries such as Matplotlib, Echarts, and Shingle.js. The server allows a user to download the image of a visualized result, and also allows a user to download the whole binary file that contains the execution result.
        <br>
        It provides an option to transform a binary file to a CSV file or an ARFF file for compatibility because some tools such as Matlab, R, and Weka require those formats.
      </p>
      <p class="content">
        Fig. 2 shows some examples of visualizing the results of different graph algorithms.
        <br>
        For example, in the case of Degree distribution, the frequencies of nodes having different degrees are presented in a chart (Fig. 2-(a)).
        <br>
        In the case of PageRank, it visualizes the graph in such a way that the size of a node is proportional to the PageRank score of the node and the nodes with top-N PageRank scores are highlighted with different colors (Fig. 2-(b)); in the case of HITS, where there exist two kinds of scores (e.g., hub score and authority score), graph visualization is similar to the previous PageRank case, but having the two kinds of result graphs for the two scores (Fig. 2-(c)); in the case of CD, it visualizes the graph in such a way that the nodes belonging to the same community have the same color and the nodes belonging to different communities have different colors (Fig. 2-(d)).
      </p>
    </div>

    <hr class="q-mt-xl">
    <div class="markdown">
      <h4 class="maintitle">How-to</h4>
    </div>
    <div class="tutorial q-py-md">
      <iframe allowfullscreen="" frameborder="0" height="547"
              marginheight="0" marginwidth="0" scrolling="no" src="https://www.slideshare.net/slideshow/embed_code/key/9V8wZi2CqduhfB" width="900"></iframe>
    </div>
    <div class="markdown">
      <h6 class="subtitle">Installation guide (Not supported yet)</h6>
      <p class="content">
        <ol>
          <li>Install Boost libarary with basic path</li>
          <li>Unzip RealGraph-CPU.zip into the preferred directory</li>
          <li>
            Enter 'make all' or 'make "alg"' to compile algorithm codes (replace "alg" with like bfs, pg, wcc)
            <ul>
              <li>several define options in makefile, most of them are related input data format</li>
              <li>bin: binary, weighted: edge with value, adjlist: adjacency list, addweight: insert edge value for no weighted input data</li>
            </ul>
          </li>
          <li>Run the compiled executable with key-value parameters</li>
        </ol>
        <br>

        <strong>Engine Parameters</strong>
        <br>
        <ul>
          <li>datapath: path to input file</li>
          <li>data : raw input file name</li>
          <li>file : preprocessed input file name</li>
          <li>memoryuse_mb : maximum available size of main memory in megabytes</li>
          <li>threads : maximum number of threads</li>
          <li>iters : maximum number of iterations</li>
          <li>preprocess : boolean whether input file needs to be preprocessed</li>
          <li>enginerun : boolean whether graph algorithm needs to be performed</li>
        </ul>

        <strong>Algorithm parameters</strong>
        <br>
        <ul>
          <li>root: starting node ID</li>
        </ul>

      </p>

      <h6 class="subtitle">Requirements</h6>
      <p class="content">
        <ul>
          <li>Boost 1.61+</li>
          <li>G++ 5.0+</li>
          <li>Ubuntu 16.04.2+</li>
        </ul>
      </p>

      <h6 class="subtitle">Directories</h6>
      <p class="content">
        <ul>
          <li>algs : RealGraph algorithm codes</li>
          <li>core : RealGraph engine core components</li>
          <li>data : RealGraph input & output data directory (configurable)</li>
        </ul>
      </p>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: 'Tutorial',
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .tutorial {
    text-align:center;
  }
  .tutorial iframe {
    border:1px solid #CCC;
    margin-bottom:5px;
    max-width: 100%;
  }
  .content {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .subtitle {
    margin-bottom: 8px;
    margin-top: 8px;
  }
  .maintitle {
    margin-bottom: 10px;
    font-weight: bold;
  }
</style>
